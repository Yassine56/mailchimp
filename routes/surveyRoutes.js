const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const mongoose = require('mongoose');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
module.exports = (app) => {

app.post('/api/surveys',requireLogin, requireCredits, (req,res) => {
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
  mailer.send();
})

};
