/**
 * Created by EK on 5/19/2016.
 */
"use strict";
var Sequelize =require('sequelize');
var createHash = require('sha.js');
var crypto = require('crypto'),shasum = crypto.createHash('sha1');//TODO- chagne Sha1 is broken
var Deeds = require("../model/deeds.js");
var LIFO = require('../public/lifo.js');
var Badge = require('../public/Badge');


var salt = "Project 15";

//salted hash
function hashedPass(pass){
    return createHash('sha256').update(salt + pass, 'utf8').digest('hex');
}

//TODO - add error handling

//1897fa4000b93a3684d25716e333440dba777aee24f717fbc2232a283fdb26ef go

module.exports = function(app, sequelize, sequelizeD, lifo){

    app.post("/login", function(req,res){

        if((!req.body.password) || (!req.body.email)) return;
        sequelize.query("SELECT id, name, coins " +
                "FROM users " +
                "WHERE password = ? AND email = ?;",  { replacements: [hashedPass(req.body.password),req.body.email], type: sequelize.QueryTypes.SELECT})
            .then(function(rows) {
                console.log(rows);
                if(rows.length == 0)
                    res.json({loggedin:false, message:'Invalid email or password.'});
                else{
                    res.cookie('username',rows[0].name, { maxAge: 900000});
                    res.cookie('userid',rows[0].id, { maxAge: 900000});
                    res.cookie('deedcoin', rows[0].coins, { maxAge: 900000});
                    res.json({loggedin:true, message:'Logged in as ' + rows[0].name + ".", name:rows[0].name});
                }
            })
            .catch(function(err) {
                res.json({loggedin:false, message:err.toString()});
            });
    });

    app.post("/register", function(req, res){

        req.body.abc="go";
        if((!req.body.password) || (!req.body.email)) return;

        sequelize.query("select name " +
            "FROM users " +
            "WHERE email = ? ",{replacements:[req.body.email], type: sequelize.QueryTypes.SELECT})
            .then(function(rows){
                console.log(rows);
                if(rows.length != 0)
                    res.json({registered:false, message:'That email is already registered.'});
                else{
                    console.log(rows);
                    var about = "No information shared";
                    if(req.body.about) about = req.body.about;
                    sequelize.query("INSERT INTO users (name,password,email, about) " +
                        "VALUES(?,?,?, ?) ",{replacements:[req.body.user, hashedPass(req.body.password), req.body.email, about], type: sequelize.QueryTypes.INSERT})
                        .then(function(rows){
                            console.log("done");
                            res.json({registered:true, message:'Your account has been created'});
                        });

                }
            });
    });

    app.get('/deed10',function(req,res){
        console.log("here");
        /*http://stackoverflow.com/questions/3333665/rank-function-in-mysql*/
        /*http://dba.stackexchange.com/questions/13703/get-the-rank-of-a-user-in-a-score-table*/
        sequelizeD.query("SELECT title, deed_coin_val " +
                "FROM deeds " +
                "ORDER BY deed_coin_val DESC " +
                "LIMIT 5;", { type: sequelize.QueryTypes.SELECT})
            .then(function(rows) {
                console.log(rows);
                res.json(
                    rows.map(function(deed, i){
                        console.log(deed);
                        return {coins: deed.deed_coin_val,
                            title: deed.title}
                    })
                );
            });
    });
    app.post('/deedsignup', function(req, res){
        sequelizeD.query("UPDATE deeds " +
                "SET slots=0 " +
                "WHERE id = ?", {replacements:[req.body.deedid], type: sequelize.QueryTypes.UPDATE})
            .then(function(rows) {
                console.log(rows);
                console.log("here");
                sequelize.query("UPDATE users " +
                    "SET coins=? "+
                    "WHERE id=? ", {replacements:[req.body.coins, req.body.userid], type: sequelize.QueryTypes.UPDATE})
                    .then(function(rows) {
                        console.log(rows);
                    });
            });
    });

    app.get('/deeds', function(req, res) {
        console.log("deeds route selected...");
        Deeds.findAll({
            where:{slots:{$gt:0}}
        })
            .then(function (result) {
                console.log("find All Results...." + result);
                res.json(result);
            });


    });
// this route adds a new deed event to the database
    app.post('api/deeds/new', function (req, res) {

        var deed = req.body;


        Deed.create({
            //deed creation details
            title: deed.name,
            location: deed.location,
            date_start: deed.date_start,
            date_end: deed.date_end,
            description: deed.description,
            image: deed.image_url,
            slots: deeds.slots,
            sponsor: deeds.sponsor,
            sponsor_img: deeds.sponsor_image,
            deed_coin_val: deeds.deed_coins
        });
    })

}