const express = require('express')
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
            res.status(400).json({
                code : 400,
                message: 'something wrong when register a new user'
            })
        }
    }

// login
    async login(req,res){
        try {
            const result = await User.findOne({
                where:{
                    [Op.or]:[
                        {username: req.body.username_email},
                        {email: req.body.username_email}
                    ]
                }
            })
            if(!result || !compareSync(req.body.password, result.password)){
               return res.status(402).json({
                    code : 400,
                    message: 'username/password is incorrect'
                })
            }

            const payload = {
                username : result.username,
                id : result.id
            }
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn:'1h'})
            return res.status(200).json({
                code:200,
                message:`login successfully`,
                token : token
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                code : 400,
                message: 'something wrong when login a user',
                error:error
            })
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
    }
    
  }

}

module.exports = new AuthController()