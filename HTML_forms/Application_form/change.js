var http = require("http");
var url = require("url");
var mysql = require("mysql");

var server = http.createServer(function (req, res) {
  console.log("request from client received.....");
  console.log("processing the request parameters...");
  const MyURL = new URL(req.url, "http://localhost:8080");
  var fname = MyURL.searchParams.get("fname");
  //var lname = MyURL.searchParams.get("lname");
  var email = MyURL.searchParams.get("email");
  var password = MyURL.searchParams.get("password");
  var password1 = MyURL.searchParams.get("password1");
  var password2 = MyURL.searchParams.get("password2");

  console.log("FName = " + fname);
  //console.log("Age = " + age);
  //console.log("address = " + address);

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

  var query = "UPDATE applicants  SET password=? WHERE email=?";
  // "INSERT into admin(UserID,Password)Values(?,?)";
  var values = [ password1,email];
  console.log(query);
  console.log(values);

  con.query(query, values, function (error, result) {
    if (error) {
      console.log("error in query");
    } else {
      res.write("Record created");
      res.end();
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
});

console.log("starting the server.....");
server.listen(8080);
console.log("server started.....");
