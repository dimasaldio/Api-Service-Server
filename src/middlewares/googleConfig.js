require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const db = require('../model/index')
const User = db.users
const {authGoogle} = require('../controllers/auth')

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_APP_CALLBACK_URL,
      }, authGoogle)
  );

  passport.serializeUser(function(user,done){
    done(null, user)
  })

  passport.deserializeUser(function(user, done){
    done(null, user)
  })

  module.exports = passport