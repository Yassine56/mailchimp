const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const mongoose = require('mongoose');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
module.exports = (app) => {

app.get('api/surveys/thanks', (req, res)=> {
  res.send({message : 'thank you for your feedback'});
})

app.post('/api/survey',requireLogin, requireCredits, async (req,res) => {
  const{ title , body, subject, recipients } = req.body;
  console.log("request body  " + req.body.body);
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
    console.log("before send");
    /// unhandled possible error, sendgrid send failure
    await mailer.send();
    console.log("sent");
    await survey.save();
    req.user.credits -= 100;
    const user = await req.user.save();
    res.send({user});
  }
  catch (err){
    console.log("err here");
    res.status(422).send(err);
  }
})
app.post('/api/surveys/webhooks',(req,res)=>{
  console.log(req.body[0].url);
  res.send({});

})

};
