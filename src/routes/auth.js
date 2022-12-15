const express = require('express')
const router = express.Router()
const {login, register} = require('../controllers/auth')
const {checkUser} = require('../controllers/validation')
const {getGoogleLogin, handleGoogleLogin} = require('../middlewares/passport')


// email
router.route('/login').post(login)
router.route('/register').post(checkUser, register)


// google
router.get('/google', getGoogleLogin)
router.get('/google/callback', handleGoogleLogin)

module.exports = router