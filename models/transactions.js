const { DataTypes } = require("sequelize");
const sequelize = require("../connection").Sequelize;

const Transactions = sequelize.define('Transactions',{
    txid:{
        type:DataTypes.STRING,
        unique: true,
        primaryKey:true
    },
    fromAddress:{
        type:DataTypes.STRING
    },
    toAddress:{
        type:DataTypes.STRING
    },
    amount:{
        type:DataTypes.DECIMAL(18, 8)
    },
    timestamp:{
        type:DataTypes.DATE
    },
    network:{
        type:DataTypes.STRING
    }
})

module.exports = Transactions;