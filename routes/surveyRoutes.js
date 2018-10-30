const _ = require('lodash');
const { URL } = require('url');
const Path = require('path-parser').default;
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const mongoose = require('mongoose');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
module.exports = (app) => {

app.get('/api/surveys',requireLogin, async (req,res)=> {
    const surveys = await Survey.find({ _user : req.user })
      .select({
        recipients : 0
      });
    res.send(surveys);
});

app.get('/ api/surveys/:surveyId/:choice', (req, res)=> {
  res.send({message : 'thank you for your feedback'});
});

app.post('/api/survey',requireLogin, requireCredits, async (req,res) => {
  const{ title , body, subject, recipients } = req.body;
  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user : req.user.id,
    dateSent : Date.now()
  })

  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    /// unhandled possible error, sendgrid send failure
    await mailer.send();
    await survey.save();
    req.user.credits -= 100;
    const user = await req.user.save();
    res.send({user});
  }
  catch (err){
    console.log("error mailer SurveyRoute");
    res.status(422).send(err);
  }
});
app.post('/api/surveys/webhooks',(req,res)=>{
  const p = new Path('/api/surveys/:surveyId/:choice');
  console.log(req.body);
  const events = _.chain(req.body)
    .map(({email, url}) => {
      // const pathname = new URL(url).pathname;
      const match = p.test(new URL(url).pathname);
      if (match){
        return {email, surveyId: match.surveyId, choice: match.choice};
      }
    })
    .compact()
    .uniqBy('email','surveyId')
    .each(({email, surveyId, choice}) => {
      Survey.updateOne({
        _id : surveyId,
        recipients : {
          $elemMatch : {email : email, responded: false}
        }
      },
        {
          $inc : {[choice] : 1},
          $set : {'recipients.$.responded' : true},
          lastResponded : new Date()
        }
      ).exec();
    })
    .value()

    console.log(events);

  // const events = _.map(req.body, ({email, url}) => {
  //   // const pathname = new URL(url).pathname;
  //   const match = p.test(new URL(url).pathname);
  //   if (match){
  //     return {email, surveyId: match.surveyId, choice: match.choice};
  //   }
  // });
  // const compactEvents = _.compact(events);
  // const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId');
  // console.log(uniqueEvents);
  res.send({});

});

};
