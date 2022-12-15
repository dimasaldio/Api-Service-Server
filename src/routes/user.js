const express = require('express')
const router = express.Router()
const {getProfile, deleteProfile, updateProfile} = require('../controllers/user')
const {authenticationJwt} = require('../middlewares/passport')

router.route('/:userID')
.get(authenticationJwt, getProfile)
.put(authenticationJwt, updateProfile)
.delete(authenticationJwt, deleteProfile)


module.exports = router