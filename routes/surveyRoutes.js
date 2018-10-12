const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Survey = require('../database/models/Survey');
module.exports = (app) => {

app.post('/api/surveys',requireLogin, requireCredits, (req,res) => {
  const{ title , body, subject, recipients } = req.body;
  const survey = new Survey({
    title : title,
    body : body,
    subject : subject,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user : req.user.id,
    dateSent : Date.now()
  })

})

};
