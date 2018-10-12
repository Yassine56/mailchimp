const keys = require('../config/key');
var sg = require('sendgrid')(keys.sendGridApiKey);
module.exports = (app)=>{
  app.get('/api/testroute', (req,res)=> {
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [
              {
                email: 'abouelouafayassine@gmail.com',
              },
            ],
            subject: 'Hello World from the SendGrid Node.js Library!',
          },
        ],
        from: {
          email: 'no-reply@gmail.com',
        },
        content: [
          {
            type: 'text/plain',
            value: 'Hello, Email!',
          },
        ],
      },
    });

    sg.API(request)
      .then(response => {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
      })
      .catch(error => {
        //error is an instance of SendGridError
        //The full response is attached to error.response
        console.log(error.response.statusCode);
      });
  })
}
