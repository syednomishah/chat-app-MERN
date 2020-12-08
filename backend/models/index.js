'use strict';
// require("dotenv").config();
const path = require('path');
const mysql2 = require('mysql2');
// const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
// import Sequelize from 'sequelize';

const fs = require('fs');
// console.log(fs);
// import fs from 'fs';
// const path = require('path');

const basename = path.basename(__filename);
let database=require('../config/config').database;
let config = require('../config/config');
let sequelize=new Sequelize(database.name,database.username,database.password,{
  host:database.host,
  dialect:database.dialect
});


// const env = config.get("NODE_ENV") || 'development';
// let cnf = {
//   dialect: 'mysql',
//   dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
//   host: config.get("database")[env].host,
//   // port: process.env.DB_PORT
// };
// let sequelize;

// sequelize = new Sequelize(config.get("database")[env].database, config.get("database")[env].username, config.get("database")[env].password, cnf);

let db={};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//config.get("database").rewrite || false
if (config.rewrite){
  sequelize.sync({force:config.forceRewrite || false}).then(() => {
     console.log("overwrite everything")
  })
}

module.exports = db;
