const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
module.exports = (app) => {

app.post('/api/payment', async (req,res)=> {

if(!req.user){
  return res.status(401).send({error : 'You must be logged in'});
}

const charge =  await stripe.charges.create({
  amount: 500,
  currency: "usd",
  source: req.body.id, // obtained with Stripe.js
  description: "5$ for 5000 credits"
});
req.user.credits+=5000;
const user = await req.user.save();

res.send(user);
})

}
