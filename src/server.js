const fastify = require('./index');
const sequelizeDB = require('./db');
require('./models/models');
// const { PORT } = process.env;

// const CURRENTPORT = PORT || 3000;

const start = async () => {
  try {
    await sequelizeDB.authenticate(); // проверка дб в консоле при npm run-e
    await sequelizeDB.sync(); // проверяет состояние бд со схемой данных
    fastify.listen(3000, () => console.log(CURRENTPORT));
  } catch (err) {
    console.log(err);
  }
};

start();
