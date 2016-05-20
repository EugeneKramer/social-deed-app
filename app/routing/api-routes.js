/**
 * Created by EK on 5/19/2016.
 */
"use strict";
var Sequelize =require('sequelize');
var createHash = require('sha.js');
var crypto = require('crypto'),shasum = crypto.createHash('sha1');//TODO- chagne Sha1 is broken

var salt = "Project 15";

//salted hash
function hashedPass(pass){
    return createHash('sha256').update(salt + pass, 'utf8').digest('hex');
}

//TODO - add error handling

//1897fa4000b93a3684d25716e333440dba777aee24f717fbc2232a283fdb26ef go

module.exports = function(app, sequelize){

    app.post("/login", function(req,res){

        if((!req.body.password) || (!req.body.email)) return;
        sequelize.query("SELECT id, name " +
                "FROM users " +
                "WHERE password = ? AND email = ?;",  { replacements: [hashedPass(req.body.password),req.body.email], type: sequelize.QueryTypes.SELECT})
            .then(function(rows) {
                console.log(rows);
                if(rows.length == 0)
                    res.json({loggedin:false, message:'Invalid email or password.'});
                else{
                    res.cookie('username',rows[0].name, { maxAge: 900000});
                    res.cookie('userid',rows[0].id, { maxAge: 900000});
                    res.json({loggedin:true, message:'Logged in as ' + rows[0].name + ".", name:rows[0].name});
                }
            })
            .catch(function(err) {
                res.json({loggedin:false, message:err.toString()});
            });
    });

/*
    var Users = sequelize.define("users", {
        id: { type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true},
        name: { type: Sequelize.STRING},
        password: { type: Sequelize.STRING},
        email: { type: Sequelize.STRING}
    });

// Sync with DB
    Users.sync();*/

    app.post("/register", function(req, res){

        if((!req.body.password) || (!req.body.email)) return;

        



        sequelize.query("SELECT name " +
                "FROM users " +
                "WHERE password = ? AND email = ?;",  { replacements: [hashedPass(req.body.password),req.body.email], type: sequelize.QueryTypes.SELECT})
            .then(function(rows) {
                console.log(rows);
                if(rows.length == 0)
                    res.json({loggedin:false, message:'Invalid email or password.'});
                else{
                    res.cookie('username',rows[0].name, { maxAge: 900000});
                    res.cookie('userid',rows[0].id, { maxAge: 900000});
                    res.json({loggedin:true, message:'Logged in as ' + rows[0].name + ".", name:rows[0].name});
                }
            })
            .catch(function(err) {
                res.json({loggedin:false, message:err.toString()});
            });


        /*
        var user = Users.build({
            name: req.body.name,
            password: req.body.password,
            email : req.body.email
        });

        user.save().then(function(){
            res.json("saved");
        })*/

        /*
         Database.findAll({
         where: { name: req.params.items}
         }).then(function(result){
         console.log(result);
         })*/



    });

}