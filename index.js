const express = require("express");
const cors = require("cors");
const { Web3 } = require("web3");
const { Op } = require('sequelize');
const mongoose = require('./connection');
const app = express();
const port = process.env.PORT || 3200;
app.use(express.json());
app.use(cors());
mongoose    
const web3 = new Web3(
    "https://sepolia.infura.io/v3/b07082cc43224533aa3f3ca2fb8ed1cc"
);

app.get('/', function(req, res){
    res.send("Welcome to the Ethereum Gas Price API!");
})

const Transactions = require("./models/transactions")

app.get("/api/v1/gasPrice", function (req, res) {
    web3.eth
        .getGasPrice()
        .then((gasPrice) => {
            console.log(gasPrice)
            res.status(200).json({ gasPrice:JSON.parse(gasPrice) });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: "Failed to fetch gas price." });
        });
});

app.get("/api/v1/contractBalance", async function (req, res){
    const balance  = await web3.eth.getBalance("0xA3347aA1BFE5e5BB9236ED67D2275F94A628e979")
    res.json({ balance: JSON.parse(balance)})
})

app.post("/api/v1/addTransaction", async function (req, res){
    const { txnHash } = req.body;
    try {
        const transaction = await web3.eth.getTransaction(txnHash);
        const newTransaction = new Transactions({
            txid: txnHash,
            fromAddress: transaction.from,
            toAddress: transaction.to,
            amount: Number(transaction.value),
            timestamp: new Date(),
            network: "sepolia"
        })
        newTransaction.save()
        .then(() => res.status(200).send("Transaction saved"))
        .catch((error) => res.status(500).send({ error: error.toString() }));
        
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to add address.",err });
    }
})

app.get("/api/v1/transactions/:address", async function (req, res ){
    const { address } = req.params;
    try {
        const ress = await Transactions.find({
            $or: [{ fromAddress: address }, { toAddress:address }]
          });
        res.status(200).json(ress)
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to fetch address.",err });
    }
});

app.listen(port, function (err) {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log("Server listening on port:", port);
    }
});
