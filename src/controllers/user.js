const { hashSync } = require('bcrypt')
const db = require('../model/index')
const User = db.users

class userController{

// update profile
    async updateProfile(req,res){
        try {
            const user = await User.findOne({raw:true, where:{id:req.params.userID}})
           
            if(!user){
                return res.status(401).json({message:'user is not found'})
            } else{
                await User.update({
                    avatar: req.body.avatar,
                    name:req.body.name,
                    username:req.body.username,
                    email:req.body.email,
                    password: hashSync(req.body.password, 10)
                }, {where:{id:req.params.userID}})
            }
            res.status(200).json({ message:'success update data' })
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error update user, check log'})
        }
    }

// get user
    async getProfile(req,res){
        try {
            const user = await User.findOne({raw:true, where:{id:req.params.userID}})
            console.log(user)
            if(!user){
                return res.status(402).json({message:'user not found'})
            }
            res.status(200).json({message:'success get data', 
            data: {
                avatar: user.avatar,
                name: user.name,
                username: user.username,
                email: user.email
            }})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error get user, check log'})
        }
    }

// delete user
async deleteProfile(req,res){
    try {
        const user = await User.findOne({raw:true, where:{id:req.params.userID}})
        if(!user){
            return res.status(402).json({message:'user not found'})
        } else{
            await User.destroy({where:{id:req.params.userID}})
        }
        res.status(200).json({message:'success delete data'})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'error get user, check log'})
    }
}
}

module.exports = new userController()


