import { fastify } from '../index.mjs';
import * as dotenv from 'dotenv';
dotenv.config();

import { sign } from 'jsonwebtoken';
import { signValidationScheme } from '../ValidationScheme/sign-validation.mjs';
import { User } from '../models/models.mjs';
import { compare, hash } from 'bcrypt';

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
