var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gauri@1029",
  database: "application_form",
  port: 3306,
});

con.connect(function (err) {
  if (err) {
    console.log("err in connectivity");
    return;
  }
  console.log("connection successful");
});

var query = "SELECT * FROM applicants";
con.query(query, function (error, result) {
  if (error) {
    console.log("error in query");
  } else {
    console.log(result);
  }
});

con.end(function (error) {
  if (error) {
    console.log("error in dissconnection");
  } else {
    console.log("Dissconnected successfully");
  }
});
