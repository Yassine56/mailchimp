const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/key');

class Mailer extends helper.Mail {

  constructor({subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridApiKey);


    this.from_email = new helper.Email('no-reply@mailchump.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();

    this.addRecipients();

  }


  formatAddresses(recipients){
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
     const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    console.log(personalize.toJSON());
    this.addPersonalization(personalize);
  }
   send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path : '/v3/mail/send',
      body : this.toJSON()
    });

    console.log(request.body);

      this.sgApi.API(request).then(response => {
      console.log("working");
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
    .catch(error => {
      //error is an instance of SendGridError
      //The full response is attached to error.response
      console.log("error");
      console.log(error.response.statusCode);
    });

  }
}
module.exports = Mailer;
