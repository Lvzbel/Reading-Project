var express = require("express");
var request = require("request");
var parseString = require("xml2js").parseString;
var app = express();

app.set("view engine", "ejs");

var options = {ignoreComment: true, preserveChildrenOrder: true};

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://www.goodreads.com/search.xml?key=r5ES2FePFPSakRWusmbVoA&q=" + query

    request(url, function(error, response, result){
    if(!error && response.statusCode == 200){
        parseString(result, options, function (err, api) {
            var data = api
            res.render("results", {data: data});
        });
    }
    });
});

app.listen(3000, function(){
    console.log('Server has started on http://localhost:3000');
});
