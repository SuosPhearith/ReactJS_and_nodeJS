const mysql = require("mysql")

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "ecm_db"
})

module.exports = db
