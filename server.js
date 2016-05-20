"uae strict";
var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');
var $ = require('cheerio');
var Sequelize = require('sequelize');

var LIFO = require('./lifo.js');
var Badge = require('./Badge');


var app= express();
var PORT= process.env.PORT||8080;
var staticContentFolder = __dirname + '/app/public'

app.use(express.static(staticContentFolder));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

var sequelize = new Sequelize("mysql://ksy5pi6dqzh8gsxr:tl8d99w1bul0rfmr@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/pt38d7p8sxy79lyx");
var sequelizeD = new Sequelize("mysql://iss7a2c2lcow0icm:sylgrzdf9u529sia@l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zbilm8sq8aqxtp9j");

require('./app/routing/api-routes.js')(app, sequelize,sequelizeD);

app.get('/leader',function(req,res){
    /*http://stackoverflow.com/questions/3333665/rank-function-in-mysql*/
    /*http://dba.stackexchange.com/questions/13703/get-the-rank-of-a-user-in-a-score-table*/
    sequelize.query("SELECT name," +
            "coins," +
            "badges," +
            "@curRank := @curRank + 1 AS rank " +
            "FROM users p, (SELECT @curRank := 0) r " +
            "ORDER BY coins;", { type: sequelize.QueryTypes.SELECT})
        .then(function(rows) {
            res.json({"data":
                rows.map(function(row, i){
                    return [row.rank,
                            row.name,
                            row.coins,
                            Badge.createBadgeHTML(JSON.parse(row.badges))]; })
            });
        });
});

app.get('/leader10',function(req,res){
    /*http://stackoverflow.com/questions/3333665/rank-function-in-mysql*/
    /*http://dba.stackexchange.com/questions/13703/get-the-rank-of-a-user-in-a-score-table*/
    sequelize.query("SELECT name," +
            "coins," +
            "badges," +
            "@curRank := @curRank + 1 AS rank " +
            "FROM users p, (SELECT @curRank := 0) r " +
            "ORDER BY coins LIMIT 5;", { type: sequelize.QueryTypes.SELECT})
        .then(function(rows) {
            res.json(
                rows.map(function(row, i){
                    return {"rank": row.rank,
                            name: row.name,
                            score: row.coins}
                })
            );
        });
});

var lifo = new LIFO(5);
lifo.add(new Badge.badgeStruct("/images/tree.png","Tree Hugger","Help Environment"));
lifo.add(new Badge.badgeStruct("/images/poor.png","Poverty Crusher","Crush Poverty"));


app.get("/awards", function(req, res){
    "use strict";
    return res.json(lifo.getElements());
});


app.use(function(req,res){
    "use strict";
    res.redirect("LeaderBoard2.html");
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});