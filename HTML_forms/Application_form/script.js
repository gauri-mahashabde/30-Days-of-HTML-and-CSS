var http = require("http");
var url = require("url");
var mysql = require("mysql");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log("Request from client received...");

  if (req.url == "/") {
    console.log("Home page");
    fs.readFile("home.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Page read successful for home.html ");
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/register") {
    console.log("Register page");
    fs.readFile("register.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/create") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    var fname = MyURL.searchParams.get("name");
    var email = MyURL.searchParams.get("email");
    var password = MyURL.searchParams.get("password");

    var query =
      "INSERT into applicants(fname , email , password ) VALUES(?,?,?)";
    // "INSERT into admin(UserID,Password)Values(?,?)";
    var values = [fname, email, password];
    console.log(query);
    console.log(values);

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

    con.query(query, values, function (error, result) {
      if (error) {
        console.log("error in query");
      } else {
        res.write("Record created");
        res.end();
        console.log(result);
      }
    });
  } else if (req.url == "/register.css") {
    fs.readFile("home.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/login") {
    console.log("Login page");
    fs.readFile("login.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Page read successful for login.html ");
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/home.css") {
    fs.readFile("home.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/change") {
    fs.readFile("", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/delete") {
    console.log("delete page");
    fs.readFile("delete.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Page read successful for login.html ");
      res.write(data.toString());
      res.end();
    });
  } else {
    console.log("else part");
    console.log("    " + req.url);
  }
});

console.log("Starting the server .... ");
server.listen(8080);
console.log("Server is started and ready to receive .... ");
