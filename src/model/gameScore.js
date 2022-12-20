const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    const Score = sequelize.define('scores', {
        id:{
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        winCount:{
            type:DataTypes.INTEGER,
            defaultValue:null
        },
        drawCount:{
            type:DataTypes.INTEGER,
            defaultValue:null
        },
        loseCount:{
            type:DataTypes.INTEGER,
            defaultValue:null
        }
    })
    return Score
}