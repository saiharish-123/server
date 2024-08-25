const mongoose = require("mongoose");

// Replace 'yourMongoDBURL' with your MongoDB connection string.
// Example: 'mongodb://localhost:27017/cryptocurrencies'
const mongoDBURL = "mongodb+srv://admin:admin@hack1.hx8sq.mongodb.net/?retryWrites=true&w=majority&appName=hack1";

// Connect to MongoDB
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Export the connection to use in other parts of your application
module.exports = mongoose;
