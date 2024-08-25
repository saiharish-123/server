const mongoose = require("mongoose");

// Define the schema
const networkSchema = new mongoose.Schema({
    network: {
        type: String,
        required: true // Make the field required if it's mandatory
    },
    chainId: {
        type: Number,
        unique: true, // Unique constraint similar to Sequelize's unique: true
        required: true // Make the field required if it's mandatory
    },
    rpcUrl: {
        type: String,
        required: true // Make the field required if it's mandatory
    },
    explorerurl: {
        type: String,
        required: true // Make the field required if it's mandatory
    },
    nativeCurrency: {
        type: String,
        required: true // Make the field required if it's mandatory
    }
});

// Create a model using the schema
const Network = mongoose.model("Network", networkSchema);

module.exports = Network;
