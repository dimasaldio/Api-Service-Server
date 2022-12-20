const db = require('../model/index')
const User = db.users
const Score = db.scores

class scoreController{

// create new score
    async createNewScore(req,res){
        try {
            const user = await User.findOne({raw:true, where:{id:req.user.id}})
            console.log(req.user.id)
            await Score.create({
                username: user.username,
                userId : req.user.id
            })
            res.status(200).json({message:'success create new score', data:{username:user.username, win:'0', draw:'0', lose:'0'}})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error create new score, check log'})
        }
    }

// update score
    async updateScore(req,res){
        try {
            const user = await User.findOne({raw:true, where:{id:req.params.userID}})
            if(!user){
                return res.status(400).json({message:'no user found'})
            }
            await Score.update({
                winCount: req.body.win,
                drawCount: req.body.draw,
                loseCount:req.body.lose
            }, {where:{userId:req.params.userID}})
            res.status(200).json({
                message:'success update score'
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error update score, check log'})
        }
    }

// get all scores
    async getScores(req,res){
        try {
           const score = await Score.findAll({raw:true})
           if(!score){
            return res.status(400).json({message:'no score found'})
           }
           console.log(score)
        //    const mapScore = score.map(x=>{
        //     return {
        //         username : x.username,
        //         win : x.winCount,
        //         draw : x.drawCount,
        //         lose : x.loseCount
        //     }
        //     console.log(mapScore)
        // })
           res.status(200).json({
            message:'success get all score',
            data : score
           })
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error get scores, check log'})
        }
    }

}

module.exports = new scoreController()