const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DATABASE_URL } = process.env;
const sequelizeDataBase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelizeDataBase;
