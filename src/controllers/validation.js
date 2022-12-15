const express = require('express')
const db = require('../model/index')
const User = db.users

class ValidationUser{
// check validation

async checkUser(req,res, next){
    try {
        const checkUsername = await User.findOne({
            where : {
                username : req.body.username
            }
        })
        if(checkUsername){
           return res.status(400).json({
                code:400,
                message:'username already taken, use another'
            })
        }

        const checkEmail = await User.findOne({
            where: {
                email : req.body.email
            }
        })
        if(checkEmail){
            return res.status(400).json({
                code:400,
                message:'email already taken, use another'
            })
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({
            code:400,
            message:'something wrong when check validation',
            error:error
        })
    }
}
}

module.exports = new ValidationUser()