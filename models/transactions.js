const mongoose = require("mongoose");

// Define the schema
const transactionSchema = new mongoose.Schema({
    txid: {
        type: String,
        unique: true,  // Ensures uniqueness, similar to Sequelize's unique constraint
        required: true, // Primary key equivalent, ensures that every document must have this field
    },
    fromAddress: {
        type: String,
        required: true, // You can specify this if the field must be present
    },
    toAddress: {
        type: String,
        required: true, // You can specify this if the field must be present
    },
    amount: {
        type: mongoose.Decimal128, // Use Decimal128 for precision, suitable for financial data
        required: true, // Ensure this field is always present
    },
    timestamp: {
        type: Date,
        required: true, // Ensure this field is always present
        default: Date.now, // You can set a default value if needed
    },
    network: {
        type: String,
        required: true, // Ensure this field is always present
    }
});

// Create a model using the schema
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
