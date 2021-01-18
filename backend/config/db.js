const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gmsecretary",
    multipleStatements: true,
  });
  
  db.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected");
    }
  });
  
  module.exports = db