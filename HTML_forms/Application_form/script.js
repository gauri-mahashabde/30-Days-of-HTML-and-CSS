var http = require('http');
var url = require('url');
var mysql = require('mysql');
var fs = require('fs');

var server = http.createServer(function (req, res) {

    console.log("Request from client received...");
   
    if (req.url == '/'){
        console.log("Home page");
        fs.readFile('home.html', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Page read successful for home.html ");
            res.write(data.toString());
            res.end();    
        });    
    }
    else if (req.url == '/register'){
        console.log("Register page");
        fs.readFile('register.html', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Page read successful for register.html ");
            res.write(data.toString());
            res.end();    
        });    
    }
    else if (req.url == '/login'){
        console.log("Login page");
        fs.readFile('login.html', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Page read successful for login.html ");
            res.write(data.toString());
            res.end();    
        });    
    }
    else if (req.url == '/home.css'){
        fs.readFile('home.css', function (err, data) {
            if (err) {
                return console.error(err);
            }
            res.write(data.toString());
            res.end();    
        });
    }
    else if (req.url == '/change'){
        fs.readFile('', function (err, data) {
            if (err) {
                return console.error(err);
            }
            res.write(data.toString());
            res.end();    
        });
    }
    
    else{
        console.log("    " + req.url);
    }

});
   
console.log("Starting the server .... ");
server.listen(8080);
console.log("Server is started and ready to receive .... ");

    



