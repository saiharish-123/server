const Web3 = require('web3');

function Web3getter(options) {
    const web3 = new Web3('https://sepolia.infura.io/v3/b07082cc43224533aa3f3ca2fb8ed1cc')
    return web3;
}

module.exports = Web3getter;
