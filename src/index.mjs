import Fastify from 'fastify';
import { User, UserCards, UsersCash } from './models/models.mjs';
import pkg from 'jsonwebtoken';
import {
  amountValidationScheme,
  removeCardValidationScheme,
  cardValidationScheme,
  signValidationScheme,
} from './ValidationScheme/sign-validation.mjs';
import * as dotenv from 'dotenv';
import { compare, hash } from 'bcrypt';
dotenv.config();

const { sign, verify } = pkg;

function jwtToken(id, email) {
  return sign(
    {
      id,
      email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

export const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
  preservePath: true,
});

fastify.register(import('@fastify/cookie'), {
  secret: process.env.MY_SECRET,
  parseOption: {},
});

//
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
//
fastify.register((instance, {}, done) => {
  instance.addHook('onRequest', async (request, reply) => {
    const { newToken } = request.cookies;
    const userInfo = verify(newToken, process.env.SECRET_KEY);

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

  // Api Cash
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
