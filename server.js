"uae strict";
var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');
var $ = require('cheerio');
var Sequelize = require('sequelize');


var app= express();
var PORT= process.env.PORT||8080;
var staticContentFolder = __dirname + '/app/public'


app.use(express.static(staticContentFolder));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

var sequelize = new Sequelize("mysql://ksy5pi6dqzh8gsxr:tl8d99w1bul0rfmr@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/pt38d7p8sxy79lyx");

//require('./app/routing/api-routes.js')(app);

//TODO - move to serverside processing instead of clientside


//TODO - validate that it's an image url, valid title
function badgeStruct(badgeURL,badgeTitle){
    "use strict";
    this.badgeURL = badgeURL;
    this.badgeTitle = badgeTitle;
}

function badgify2(badges){
    "use strict";
    if(badges == null) return null;

    return $("<span/>").append(badges.map(function(badge, i){
        return $("<img/>").attr({"src":badge.badgeURL,
                                    "title": badge.badgeTitle,
                                    "height":"25px",
                                    "width":"25px"});
    })).toString();
}
/*
console.log(JSON.stringify([new badgeStruct("/images/poor.png","Poverty Crusher"),
    new badgeStruct("/images/tree.png","Tree Hugger"),
    new badgeStruct("/images/education.png","Education")]));
*/

app.get('/leader',function(req,res){
    /*http://stackoverflow.com/questions/3333665/rank-function-in-mysql*/
    /*http://dba.stackexchange.com/questions/13703/get-the-rank-of-a-user-in-a-score-table*/
    sequelize.query("SELECT name," +
            "coins," +
            "badges," +
            "@curRank := @curRank + 1 AS rank " +
            "FROM ranking p, (SELECT @curRank := 0) r " +
            "ORDER BY coins;", { type: sequelize.QueryTypes.SELECT})
        .then(function(rows) {
            console.log(rows);
            res.json({"data":
                rows.map(function(row, i){
                    "use strict";
                    return [row.rank,
                            row.name,
                            row.coins,
                            badgify2(JSON.parse(row.badges))]; })
            });
        });
});

app.use(function(req,res){
    "use strict";
    res.redirect("LeaderBoard2.html");
})

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

