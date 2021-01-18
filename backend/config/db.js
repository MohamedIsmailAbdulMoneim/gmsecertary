var mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gmsecretary",
    multipleStatements: true,
  });

  
  module.exports = db