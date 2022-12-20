const dbConfig = require('./config')
const Sequelize = require('sequelize')
const {DataTypes} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,
    define: {
        timestamps: false
    }

})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel') (sequelize, Sequelize)
db.scores = require('./gameScore') (sequelize,Sequelize)

// relation

db.users.hasOne(db.scores,{
    foreignKey:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    }
})
db.scores.belongsTo(db.users)

module.exports = db