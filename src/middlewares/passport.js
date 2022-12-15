const passport = require('./config')
const googlePassport = require("./googleConfig");

// -----------------------------google
const getGoogleLogin = googlePassport.authenticate("google", { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] })

const handleGoogleLogin = googlePassport.authenticate("google", {failureRedirect: "/", successRedirect : '/getAll'})


// -----------------------------email
const authenticationJwt = passport.authenticate('jwt', {
  session: false
})

module.exports = {getGoogleLogin, handleGoogleLogin, authenticationJwt}