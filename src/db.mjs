// const { Sequelize } = require('sequelize');
// require('dotenv').config();
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
const { DATABASE_URL } = process.env;
const sequelizeDataBase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelizeDataBase;
// module.exports = sequelizeDataBase;
