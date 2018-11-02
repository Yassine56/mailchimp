// production keys heeeeere
module.exports = {
  googleClientID : process.env.GOOGLE_CIENT_ID,
  googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
  mongoURI : process.env.MONGO_URI,
  cookieKey : process.env.COOKIE_KEY,
  stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey : process.env.STRIPE_SECRET_KEY,
  sendGridApiKey : process.env.SENDGRID_API_KEY
};
