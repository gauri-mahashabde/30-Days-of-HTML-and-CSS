var http = require("http");
var url = require("url");
var mysql = require("mysql");
var fs = require("fs");
var qs = require("querystring");
var server = http.createServer(function (req, res) {
  console.log("Request from client received...");
  //Home page
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
  }
  //Registration part
  //Register main page
  else if (req.url == "/register") {
    console.log("Register page");
    fs.readFile("register.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  }
  //path to create a data , query part
  else if (req.url == "/create") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      var post = qs.parse(body);

      console.log(post);
      fname = post["name"];
      email = post["email"];
      password = post["password"];

      //const {name , email , password, password2} = JSON.parse(body);
      var query =
        "INSERT into applicants(fname , email , password ) VALUES(?,?,?)";
      var values = [fname, email, password];
      //console.log(query);
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
          // record is created
          // so opening login page
          console.log("Login page");
          fs.readFile("login.html", function (err, data) {
            if (err) {
              return console.error(err);
            }
            res.write(data.toString());
            res.end();
          });
        }
      });
    });
  }
  //css page for register
  else if (req.url == "/register.css") {
    fs.readFile("register.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  }

  //login page
  else if (req.url == "/login") {
    console.log("Login page");
    fs.readFile("login.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } // end of login
  //path to login and query to verify the credentials
  else if (req.url == "/validate") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      var post = qs.parse(body);
      console.log(post);

      // "INSERT into admin(UserID,Password)Values(?,?)";
      var email = post["email"];
      var password = post["password"];

      var query = "SELECT * FROM applicants WHERE email=? AND password =?";
      var values = [email, password];
      console.log(query);

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
        } else {
          con.query(query, values, function (error, result) {
            if (error) {
              console.log("error in query");
            } else {
              console.log("query excecute");
              console.log(result);
              console.log(result.length);
              if (result.length == 1) {
                fs.readFile("main.html", function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  res.write(data.toString());
                  res.end();
                });
              } else {
                res.write("username password is invalid , Try again");
                res.end();
              }
            }
          });
        }
      });
    });
  } else if (req.url == "/login.css") {
    fs.readFile("login.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/main.css") {
    fs.readFile("main.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
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
  }

  //the delete section
  //opening the delete page
  else if (req.url == "/delete") {
    console.log("Delete page");
    fs.readFile("delete.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } // end of login
  //path to login and query to verify the credentials
  else if (req.url == "/deleteit") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      var post = qs.parse(body);
      console.log(post);

      // "INSERT into admin(UserID,Password)Values(?,?)";
      var email = post["email"];
      var query = "DELETE from applicants WHERE email=?";
      var values = [email];
      console.log(query);

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
        } else {
          con.query(query, values, function (error, result) {
            if (error) {
              console.log("error in query");
            } else {
              console.log("query excecute");
              console.log(result);
              console.log(result.affectedRows);
              if (result.affectedRows == 1) {
                fs.readFile("home.html", function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  res.write(data.toString());
                  res.end();
                });
              } else {
                res.write("username password is invalid , Try again");
                res.end();
              }
            }
          });
        }
      });
    });
  }

  //change password section
  else if (req.url == "/Change") {
    console.log("change    page");
    fs.readFile("change.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } // end of login
  //path to login and query to verify the credentials
  else if (req.url == "/changeIt") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      var post = qs.parse(body);
      console.log(post);

      password1 = post["password1"];
      email = post["email"];
      // "INSERT into admin(UserID,Password)Values(?,?)";
      var query = "UPDATE applicants  SET password=? WHERE email=?";
      // "INSERT into admin(UserID,Password)Values(?,?)";
      var values = [password1, email];
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
        } else {
          con.query(query, values, function (error, result) {
            if (error) {
              console.log("error in query");
            } else {
              console.log("query excecute");
              console.log(result);
              console.log(result.affectedRows);
              if (result.affectedRows == 1) {
                fs.readFile("home.html", function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  res.write(data.toString());
                  res.end();
                });
              } else {
                res.write("username password is invalid , Try again");
                res.end();
              }
            }
          });
        }
      });
    });
  } else if (req.url == "/form") {
    console.log("Application form");
    fs.readFile("form.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/style.css") {
    fs.readFile("style.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/submit") {
    console.log("Application form with details");
    fs.readFile("form.html", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } else if (req.url == "/submitform") {
    const MyURL = new URL(req.url, "http://localhost:8080");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      var post = qs.parse(body);
      console.log(post);
      fname = post["fname"];
      lname = post["lname"];
      email = post["email"];
      phone = post["phone"];
      gender = post["Gender"];
      country = post["country"];
      city = post["city"];
      address = post["add"];
      position = post["position"];
      HTML = post["HTML"];
      if (HTML == null) {
        HTML = 0;
      } else {
        HTML = 1;
      }

      CSS = post["CSS"];
      if (CSS == null) {
        CSS = 0;
      } else {
        CSS = 1;
      }

      Js = post["JS"];
      if (Js == null) {
        Js = 0;
      } else {
        Js = 1;
      }

      ReactJS = post["ReactJS"];
      if (ReactJS == null) {
        ReactJS = 0;
      } else {
        ReactJS = 1;
      }

      NodeJS = post["NodeJS"];
      if (NodeJS == null) {
        NodeJS = 0;
      } else {
        NodeJS = 1;
      }

      MongoDb = post["MongoDb"];
      if (MongoDb == null) {
        MongoDb = 0;
      } else {
        MongoDb = 1;
      }

      Mysql = post["Mysql"];
      if (Mysql == null) {
        Mysql = 0;
      } else {
        Mysql = 1;
      }

      Java = post["Java"];
      if (Java == null) {
        Java = 0;
      } else {
        Java = 1;
      }

      PHP = post["PHP"];
      if (PHP == null) {
        PHP = 0;
      } else {
        PHP = 1;
      }
      addinfo = post["info"];
      file = post["file"];
      //var name = MyURL.searchParams.get("name");
      uname = post["Username"];
      //var mail = MyURL.searchParams.get("email");
      mail = post["password"];
      // "INSERT into admin(UserID,Password)Values(?,?)";
      var query =
        "UPDATE applicants SET fname = ?, lname=?,phone=?,gender=?,country=?,city=?, address=?,designation=?,HTML=?,CSS=?,JS=?,ReactJS=?,NodeJS=?,MongoDb=?,Mysql=?,Java=?,PHP=?,addinfo=? , addfile=? where email=?"
      //("INSERT into admin(UserID,Password)Values(?,?)");
      var values = [
        fname,
        lname,
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
        email
      ];
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
        } else {
          con.query(query, values, function (error, result) {
            if (error) {
              console.log("error in query");
              console.log(error);
            } else {
              console.log("query excecute");
              console.log(result);
              console.log(result.affectedRows);
              if (result.affectedRows == 1) {
                fs.readFile(
                  "Application submitted sucessfully",
                  function (err, data) {
                    if (err) {
                      return console.log(err);
                    }
                    res.write(data.toString());
                    res.end();
                  }
                );
              } else {
                res.write("username password is invalid , Try again");
                res.end();
              }
            }
          });
        }
      });
    });
  }
  //css page for register
  else if (req.url == "/register.css") {
    fs.readFile("register.css", function (err, data) {
      if (err) {
        return console.error(err);
      }
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
