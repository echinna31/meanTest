/**
 * Created by Ch4rger on 10/15/2016.
 */
var express = require('express');
//var mongojs = require('mongojs');
var app = express();
//var db = mongojs('taggnews',['taggnews']);
var bodyparser =  require('body-parser');
var port = Number(process.env.PORT || 3000);
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://taggsc.x10host.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname +"/public"));
app.use(bodyparser.json());
console.log("server hit")

app.listen(port );