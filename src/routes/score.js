const express= require('express')
const router = express.Router()
const {createNewScore, updateScore, getScores} = require('../controllers/scores')
const {authenticationJwt} = require('../middlewares/passport')

router.get('/', getScores)
router.post('/', authenticationJwt, createNewScore)
router.put('/:userID', authenticationJwt, updateScore)


module.exports=router