const Fastify = require('fastify');
const path = require('path');
const { User, UserCards, UsersCash } = require('./models/models');
const { compare, hash } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const {
  signValidationScheme,
  cardValidationScheme,
  amountValidationScheme,
  removeCardValidationScheme,
} = require('./ValidationScheme/sign-validation');
const sequelizeDB = require('./db');

require('./models/models');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const fastify = Fastify({
  logger: true,
});

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/multipart'), {
  addToBody: true,
  preservePath: true,
});

fastify.register(require('@fastify/cookie'), {
  secret: 'my-secret',
  parseOption: {},
});

function jwtToken(id, email) {
  return sign(
    {
      id,
      email,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
}

fastify.post(
  '/api/registration',
  signValidationScheme,
  async (request, reply) => {
    const { email, password } = request.body;

    if (await User.findOne({ where: { email } })) {
      return reply.status(400).send({ info: 'Email already exist' });
    }
    const user = await User.create({
      email,
      password: await hash(password, 10),
    });

    user.save();
    return reply.status(200).send({ info: 'Registration successful' });
  }
);

fastify.post('/api/login', signValidationScheme, async (request, reply) => {
  const { email, password } = request.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return reply.status(400).send({ info: 'User not found' });
  }

  if (user && (await compare(password, user.password))) {
    const newToken = jwtToken(user.id, user.email);
    return reply
      .setCookie('newToken', newToken, {
        httpOnly: true,
      })
      .send({ info: 'Ok' });
  }
  return reply.status(400).send({ info: 'Not correct password' });
});

fastify.delete('/api/logout', async (request, reply) => {
  return reply.clearCookie('newToken').send('Token deleted');
});
//

fastify.register((instance, {}, done) => {
  instance.addHook('onRequest', async (request, reply) => {
    const { newToken } = request.cookies;

    const userInfo = verify(newToken, SECRET_KEY);

    if (userInfo) {
      request.user = await User.findOne({
        where: {
          id: userInfo.id,
        },
      });
    } else {
      return reply.status(403).send({ info: 'Not correct Token' });
    }
  });

  instance.get('/api/cards', async (request, reply) => {
    const { user } = request;

    const cards = await UserCards.findAll({
      where: {
        userId: user.id,
      },
    });
    if (cards) {
      return reply.send(cards);
    }
    return reply.send({ info: 'No one cards on this user' });
  });

  instance.post('/api/cards', cardValidationScheme, async (request, reply) => {
    const {
      body: { cardNumber, date, amount, currency, cvv, bank, scheme, type },
      user,
    } = request;

    const card = await UserCards.create({
      cardNumber,
      date,
      amount,
      currency,
      cvv,
      bank,
      type,
      scheme,
      userId: user.id,
    });
    card.save();
    return reply.send(
      await UserCards.findAll({
        where: {
          userId: user.id,
        },
      })
    );
  });

  instance.put(
    '/api/cards/:id',
    amountValidationScheme,
    async (request, reply) => {
      const {
        body: { amount, currency },
        user,
        params: { id },
      } = request;
      const card = await UserCards.findOne({ where: { id, userId: user.id } });
      if (card) {
        await card.update({ amount, currency });
        await card.save();
        return reply.send(card);
      }
      return reply.status(404).send({ info: 'Card does not exist' });
    }
  );

  instance.delete(
    '/api/cards/:id',
    removeCardValidationScheme,
    async (request, reply) => {
      const {
        params: { id },
        user,
      } = request;
      const card = await UserCards.findOne({ where: { id, userId: user.id } });

      if (card) {
        await card.destroy();
        await card.save();

        return reply.send(
          await UserCards.findAll({ where: { userId: user.id } })
        );
      }
      return reply.status(404).send({ info: 'Card does not exist' });
    }
  );

  //
  //

  instance.get('/api/cash', async (request, reply) => {
    const { user } = request;

    const cash = await UsersCash.findAll({ where: { userId: user.id } });

    if (cash) {
      return reply.send(cash);
    }
    return reply.status(404).send({ info: 'This user does not any cash' });
  });

  instance.post('/api/cash', async (request, reply) => {
    const {
      body: { amount, currency },
      user,
    } = request;
    const cash = await UsersCash.create({
      amount,
      currency,
      userId: user.id,
    });
    cash.save();

    return reply.send(
      await UsersCash.findAll({
        where: {
          userId: user.id,
        },
      })
    );
  });

  instance.put(
    '/api/cash/:id',
    amountValidationScheme,
    async (request, reply) => {
      const {
        body: { amount, currency },
        user,
        params: { id },
      } = request;

      const cash = await UsersCash.findOne({ where: { id, userId: user.id } });

      if (cash) {
        await cash.update({ amount, currency });
        await cash.save();
        return reply.send(cash);
      }

      return reply.status(400).send({ info: 'Cash doesn not update' });
    }
  );

  instance.delete(
    '/api/cash/:id',
    removeCardValidationScheme,
    async (request, reply) => {
      const {
        params: { id },
        user,
      } = request;

      const cash = await UsersCash.findOne({ where: { id, userId: user.id } });

      if (cash) {
        await cash.destroy();
        await cash.save();
        return reply.send(
          await UsersCash.findAll({ where: { userId: user.id } })
        );
      }

      return reply.status(404).send({ info: 'Cash with this id not found' });
    }
  );
  done();
});

const { PORT } = process.env;
const CURRENTPORT = PORT || 3000;

const start = async () => {
  try {
    await sequelizeDB.authenticate(); // проверка дб в консоле при npm run-e
    await sequelizeDB.sync(); // проверяет состояние бд со схемой данных
    fastify
      .listen({
        port: CURRENTPORT,
        host: '0.0.0.0',
      })
      .then(() => console.log(CURRENTPORT));
  } catch (err) {
    console.log(err);
  }
};
start();

module.exports = {
  SECRET_KEY,
  fastify,
};
