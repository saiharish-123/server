const express = require("express");
const cors = require("cors");
const { Web3 } = require("web3");
const {connect,Sequelize} = require("./connection")
const app = express();
const port = process.env.PORT || 3200;
app.use(express.json());
app.use(cors());

const web3 = new Web3(
    "https://sepolia.infura.io/v3/b07082cc43224533aa3f3ca2fb8ed1cc"
);

app.get('/', function(req, res){
    res.send("Welcome to the Ethereum Gas Price API!");
})

const Transactions = require("./models/transactions")
const Networks = require("./models/networks");
const { where, Op } = require("sequelize");

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
    const { address,to,amount,txid } = req.params;
    try {
        Sequelize.sync();
        // Transactions.truncate()
        const newTransaction = await Transactions.create({
            txid: txid,
            fromAddress: address,
            toAddress: to,
            amount: amount,
            timestamp: new Date(),
            network: "sepolia"
        })
        res.status(200).json(newTransaction)
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to add address.",err });
    }
})

app.get("/api/v1/transactions/:address", async function (req, res ){
    const { address } = req.params;
    try {
        Sequelize.sync();
        console.log(address)
        const ress = await Transactions.findAll({where:{[Op.or]:{fromAddress:address,toAddress:address}}});
        res.status(200).json(ress)
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to add address.",err });
    }
});

app.post("/api/v1/sendTransaction", async function (req, res) {
    const { from, to, value } = req.body;
    try {
        const txHash = await web3.eth.sendTransaction({
            from,
            to,
            value: web3.utils.toHex(web3.utils.toBN(value)),
        });
        res.status(200).json({ txHash });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to send transaction." });
    }
})

app.listen(port, function (err) {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log("Server listening on port:", port);
    }
});
