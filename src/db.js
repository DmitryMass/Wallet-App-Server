require('dotenv').config();

const { Sequelize } = require('sequelize');
const { DATABASE_URL } = process.env;
const sequelizeDataBase = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = sequelizeDataBase;
