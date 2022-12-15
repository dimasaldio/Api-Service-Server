const { hashSync, compareSync } = require('bcrypt')
const db = require('../model/index')
const User = db.users
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

class AuthController{

// register
    async register(req,res){
        try {
            await User.create({
                avatar : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fno-profile-picture-icon-21.jpg&f=1&nofb=1&ipt=991238c91de9728b05df6fbbe038450316ee5cbb5f7b3ed4862c2274a6e3127f&ipo=images',
                name : req.body.name,
                username : req.body.username,
                email : req.body.email,
                password: hashSync(req.body.password, 10)
            })
            
            res.status(200).json({
                code:200,
                message:'register successfully',
                data :{
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error register user, check log'})
        }
    }

// login
    async login(req,res){
        try {
            const user = await User.findOne({
                where:{
                    [Op.or]:[
                        {username: req.body.username_email},
                        {email: req.body.username_email}
                    ]
                }
            })
            if(!user || !compareSync(req.body.password, user.password)){
               return res.status(402).json({
                    code : 400,
                    message: 'username/password is incorrect'
                })
            }

            const payload = {
                username : user.username,
                id : user.id
            }
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn:'1h'})

            res.status(200).json({
                code:200,
                message:`login successfully`,
                data : {
                    id : user.id,
                    email : user.email
                },
                token : token
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error login user, check log'})
        }
    }

// google
async authGoogle (accessToken, refreshToken, profile, cb) {
    try {
        const findUser = await User.findAll({
            where: {
              googleID: profile._json.sub
            },
          });
          if(findUser.length===0){
           const createUser = await User.create({
              googleID: profile._json.sub,
              name: profile._json.name,
              username: profile._json.email,
              email: profile._json.email
            })
      
            return cb(null, createUser)
          }
          cb(null,findUser);
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'error auth google user, check log'})
    }
    
  }

}

module.exports = new AuthController()