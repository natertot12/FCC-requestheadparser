/*var http = require('http'),
    fs = require('fs'),
    url = require("url"), 
    externalip = require("externalip");

fs.readFile('./client/index.html', function (err, html) {
    if (err) throw err;
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        //response.write(html);
        var exip = null;
        externalip(function(err, ip) {
            if(err) throw err;
            exip = ip;
        });
        

        response.end();
    }).listen(8080);
});
*/
var requestLanguage = require('express-request-language');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var externalip = require("externalip");
var os = require("os");

app.use(cookieParser());
app.use(requestLanguage({
  languages: ['en-US', 'zh-CN'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));

app.get('/', function(req, res, next) {
    var exip = "";
    var osname = os.platform();
    var osver = os.release();
    externalip(function(err, ip) {
        if(err) throw err;
        exip = ip;
        console.log(ip);
        res.send("You are running " + osname + " version: " + osver + " " + "Your language is: " + req.language + " " + "Your Ip is: " + exip + " ");
    });
  console.log(req.language);
  
  
});
app.listen(8081);