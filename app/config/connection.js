/**
 * Created by Shawn on 5/16/2016.
 */
var Sequelize = require("sequelize");


var source = {
    jawsDB: {
        port: 3306,
        host: 'l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'iss7a2c2lcow0icm',
        password: "sylgrzdf9u529sia",
        database: "zbilm8sq8aqxtp9j"

    },
    local: {
        port: 3306,
        host: 'localhost',
        user: 'nodeuser',
        password: 'test123',
        database: 'social_deeds_test'
    }
};

var selectedSource = source.jawsDB;

var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
    host: selectedSource.host,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});
console.log("sequelize connection initiated.");
module.exports = sequelize;