'use strict';

let fs        = require('fs');
let path      = require('path');
let Sequalize = require('sequalize');
let basename  = path.basename(__filename);
let db        = {};

//connect to sequelize using env variables
const sequalize = new Sequalize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password,{
  host:    CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port:    CONFIG.db_port,
  operatorAliases: false
});

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) == '.js');
}).forEach(file => {
  let model = sequilize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequalize = sequalize;
db.Sequalize = Sequalize;

module.exports = db;
