const sequelizePackage = require('sequelize');
const allConfig = require('../config/config');
const gameModel = require('./gameModel');
const userModel = require('./userModel');

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.Game = gameModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);

db.User.belongsToMany(db.Game, { through: 'games_users' });
db.Game.belongsToMany(db.User, { through: 'games_users' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
