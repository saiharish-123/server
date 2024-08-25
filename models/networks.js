const { DataTypes } = require("sequelize");
const sequelize = require("../connection").Sequelize;

const Networks = sequelize.define('Networks',{
    network:{
        type:DataTypes.STRING,
    },
    chainId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    rpcUrl: {
        type: DataTypes.STRING
    },
    explorerurl: {
        type: DataTypes.STRING
    },
    natiiveCurrency:{
        type: DataTypes.STRING
    }
})

module.exports = Networks;