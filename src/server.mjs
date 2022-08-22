// import { fastify } from './index.mjs';
// import sequelizeDataBase from './db.mjs';
// import './models/models.mjs';

// const { PORT } = process.env;
// const CURRENTPORT = PORT || 3000;

// const start = async () => {
//   try {
//     await sequelizeDataBase.authenticate(); // проверка дб в консоле при npm run-e
//     await sequelizeDataBase.sync(); // проверяет состояние бд со схемой данных
//     fastify
//       .listen({
//         port: CURRENTPORT,
//         host: '0.0.0.0',
//       })
//       .then(() => console.log(CURRENTPORT));
//   } catch (err) {
//     console.log(err);
//   }
// };
// start();
