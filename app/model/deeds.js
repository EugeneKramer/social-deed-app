/**
 * Created by Shawn on 5/16/2016.
 */
var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Deed = sequelize.define("deeds", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING
    },
    location:{
        type:Sequelize.STRING
    },
    date_start:{
        type:Sequelize.DATE
    },
    date_end:{
        type:Sequelize.DATE
    },
    description:{
        type:Sequelize.TEXT
    },
    image:{
        type:Sequelize.STRING
    },
    slots:{
        type:Sequelize.INTEGER
    },
    sponsor:{
        type:Sequelize.STRING
    },
    sponsor_img:{
        type:Sequelize.STRING
    },
    deed_coin_val:{
        type:Sequelize.INTEGER
    },
    updatedAt:{
        type:Sequelize.DATE
    },
    createdAt:{
        type:Sequelize.DATE
    }
});

Deed.sync().then(function(result){
    console.log(result);

});

module.exports = Deed;