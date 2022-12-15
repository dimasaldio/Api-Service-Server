const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    const User = sequelize.define('users', {
        id : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        googleID : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username : {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            unique:true,
            isEmail:true,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return User
}