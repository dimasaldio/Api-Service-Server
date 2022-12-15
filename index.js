require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const router = require('./src/routes')
const db = require('./src/model/index')
const session = require('express-session')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

db.sequelize.sync()


app.use(passport.initialize())
app.use(passport.session())
require('./src/middlewares/passport')


app.use(router)

app.listen(process.env.PORT, ()=>{
    console.log(`terhubung ke ${process.env.PORT}`)
})