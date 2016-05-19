/**
 * Created by EK on 5/19/2016.
 */
var Sequelize =require('sequelize');
"use strict";

//TODO - add error handling

module.exports = function(app, sequelize){

    app.post("/login", function(req,res){
        "use strict";

        if((!req.body.password) || (!req.body.email)) return;

        sequelize.query("SELECT id, name " +
                "FROM users " +
                "WHERE password = ? AND email = ?;",  { replacements: [req.params.password,req.params.email], type: sequelize.QueryTypes.SELECT})
            .then(function(rows) {
                console.log(rows);
                //    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });

            })
            .catch(function(err) {
                res.json({loggedin:false,
                    message:err.toString()});
            });
    });


    var Users = sequelize.define("users", {
        id: { type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true},
        name: { type: Sequelize.STRING},
        password: { type: Sequelize.STRING},
        email: { type: Sequelize.STRING}
    });

// Sync with DB
    Users.sync();

    app.post("/register", function(req, res){
        "use strict";
        var user = Users.build({
            name: req.body.name,
            password: req.body.password,
            email : req.body.email
        });

        user.save().then(function(){
            res.json("saved");
        })

        /*
         Database.findAll({
         where: { name: req.params.items}
         }).then(function(result){
         console.log(result);
         })*/



    });

}