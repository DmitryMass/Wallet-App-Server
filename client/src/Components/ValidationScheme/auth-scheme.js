import * as yup from 'yup';

export const authScheme = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email')
    .min(6, 'Must be at least 6 characters')
    .max(30, 'Must be at most 20 characters')
    .required(),
  password: yup
    .string()
    .label('Password')
    .min(6, 'Must be at least 6 characters')
    .max(20, 'Must be at most 20 characters')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Repeat the previous password'),
});
