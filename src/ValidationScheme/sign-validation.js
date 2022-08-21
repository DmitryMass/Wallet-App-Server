const signValidationScheme = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          minLength: 6,
          maxLength: 30,
        },
        password: {
          type: 'string',
          minLength: 4,
          maxLength: 30,
        },
      },
    },
  },
};

const cardValidationScheme = {
  schema: {
    body: {
      type: 'object',
      required: ['cardNumber', 'bank', 'cvv', 'amount'],
      properties: {
        cardNumber: {
          type: 'string',
          minLength: 14,
          maxLength: 16,
        },
        bank: {
          type: 'string',
          minLength: 3,
          maxLength: 20,
        },
        cvv: {
          type: 'number',
          minimum: 3,
        },
        amount: {
          type: 'number',
          minimum: 1,
          maximum: 10,
        },
      },
    },
  },
};

const amountValidationScheme = {
  schema: {
    body: {
      type: 'object',
      required: ['amount'],
      properties: {
        amount: {
          type: 'number',
          minimum: 1,
          maximum: 10,
        },
      },
    },
  },
};

const removeCardValidationScheme = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
        },
      },
    },
  },
};

module.exports = {
  removeCardValidationScheme,
  amountValidationScheme,
  cardValidationScheme,
  signValidationScheme,
};
