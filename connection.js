const mysql = require("mysql");
// Create a connection to the MySQL database. Replace 'yourusername' and 'yourpassword' with your MySQL credentials.
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    port: 3306,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
        "CREATE DATABASE IF NOT EXISTS cryptocurrencies",
        function (err, result) {
            if (err) throw err;
            console.log("Database created");
            con.query("USE cryptocurrencies", function (err, result) {
                if (err) throw err;
                console.log("Database selected");
            });
        }
    );
});

const Sequelize = require("sequelize");
const sequelize = new Sequelize("cryptocurrencies", "root", "admin123", {
    host: "localhost",
    dialect: "mysql",
    log:"false"
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

exports.connect = con;
exports.Sequelize = sequelize;