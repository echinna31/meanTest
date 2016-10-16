/**
 * Created by Ch4rger on 10/15/2016.
 */
var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('taggnews',['taggnews']);
var bodyparser =  require('body-parsvaer');
var port = Number(process.env.PORT || 3000);
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://taggsc.x10host.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname +"/public"));
app.use(bodyparser.json());

app.get('/getnews',function(req,res){
 var dbnews =   db.taggnews.find(function(err, docs){

     console.log(docs);
     res.json(docs)
 });

})

app.post('/postnews',function(req,res){
    var dbnews =   db.taggnews.insert(req.body,function(err,doc){
        res.json(doc)
    });

})


app.delete('/deletenews/:id',function(req,res){
    var id=req.params.id;
  db.taggnews.remove({_id: mongojs.ObjectId(id)},function(err,d){
        res.json(d);
    });

})

app.get('/getnewsbyid/:id',function(req,res){
    var id=req.params.id;
    db.taggnews.findOne({_id: mongojs.ObjectId(id)},function(err,d){
        res.json(d);
    });

})
app.put('/updatenewsbyid/:id',function(req,res){
    var id=req.params.id;
    db.taggnews.findAndModify({query:{_id: mongojs.ObjectId(id)},update:{$set:{newsEntry:req.body.newsEntry}},new:true},function(err,d){
        res.json(d);
    });

})



app.listen(port );