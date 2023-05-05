var http = require("http");
var url = require("url");
var mysql = require("mysql");

var server = http.createServer(function (req, res) {
  console.log("request from client received.....");
  console.log("processing the request parameters...");
  const MyURL = new URL(req.url, "http://localhost:8080");
  var fname = MyURL.searchParams.get("fname");
  var lname = MyURL.searchParams.get("lname");
  var email = MyURL.searchParams.get("email");
  var phone = MyURL.searchParams.get("phone");
  var gender = MyURL.searchParams.get("Gender");
  var country = MyURL.searchParams.get("country");
  var city = MyURL.searchParams.get("city");
  var address = MyURL.searchParams.get("add");
  var position = MyURL.searchParams.get("position");
  var HTML = MyURL.searchParams.get("HTML");
  if (HTML == null) {
    HTML = 0;
  } else {
    HTML = 1;
  }

  var CSS = MyURL.searchParams.get("CSS");
  if (CSS == null) {
    CSS = 0;
  } else {
    CSS = 1;
  }

  var Js = MyURL.searchParams.get("JS");
  if (Js == null) {
    Js = 0;
  } else {
    Js = 1;
  }

  var ReactJS = MyURL.searchParams.get("ReactJS");
  if (ReactJS == null) {
    ReactJS = 0;
  } else {
    ReactJS = 1;
  }

  var NodeJS = MyURL.searchParams.get("NodeJS");
  if (NodeJS == null) {
    NodeJS = 0;
  } else {
    NodeJS = 1;
  }

  var MongoDb = MyURL.searchParams.get("MongoDb");
  if (MongoDb == null) {
    MongoDb = 0;
  } else {
    MongoDb = 1;
  }

  var Mysql = MyURL.searchParams.get("Mysql");
  if (Mysql == null) {
    Mysql = 0;
  } else {
    Mysql = 1;
  }

  var Java = MyURL.searchParams.get("Java");
  if (Java == null) {
    Java = 0;
  } else {
    Java = 1;
  }

  var PHP = MyURL.searchParams.get("PHP");
  if (PHP == null) {
    PHP = 0;
  } else {
    PHP = 1;
  }
  var addinfo = MyURL.searchParams.get("info");
  var file = MyURL.searchParams.get("file");
  //var name = MyURL.searchParams.get("name");
  var uname = MyURL.searchParams.get("Username");
  //var mail = MyURL.searchParams.get("email");
  var mail = MyURL.searchParams.get("password");

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

  var query =
    "INSERT into applicants(fname, lname,email,phone,gender,country,city, address,designation,HTML,CSS,JS,ReactJS,NodeJS,MongoDb,Mysql,Java,PHP,addinfo , addfile) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    "INSERT into admin(UserID,Password)Values(?,?)";
  var values = [
    fname,
    lname,
    email,
    phone,
    gender,
    country,
    city,
    address,
    position,
    HTML,
    CSS,
    Js,
    ReactJS,
    NodeJS,
    MongoDb,
    Mysql,
    Java,
    PHP,
    addinfo,
    file,
    uname,
    mail,
  ];
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
