import * as yup from 'yup';

export const newCardValidation = yup.object().shape({
  bank: yup
    .string()
    .label('Bank')
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Must be at most 20 characters')
    .matches(/^[a-zA-Z\s]*$/g, 'Only ENG name of Banking')
    .required(),
  cardNumber: yup
    .string()
    .label('Card number')
    .min(14, 'Must be at least 14 characters')
    .max(16, 'Must be at most 16 characters')
    .matches(/^[0-9\s]*$/g, 'Card format must be: 1234 5678 9876 5432')
    .required(),
  cvv: yup
    .string()
    .label('Card cvv')
    .min(3, 'Must be at least 3 characters')
    .max(4, 'Must be at most 4 characters')
    .matches(/^[0-9\s]*$/g, 'Format NNN or NNNN')
    .required(),
  amount: yup
    .string()
    .label('Amount money')
    .min(1)
    .max(10)
    .matches(/^[0-9\s]+(\.\d{0,2})*$/g, 'Wrong money format ex: 1234.25')
    .required(),
  currency: yup.string().label('Currency').required(),
  date: yup
    .string()
    .label('Date is')
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiration date is required')
    .test((date) => {
      if (!date) {
        return false;
      }
      const today = new Date();
      const monthToday = today.getMonth() + 1;
      const yearToday = today.getFullYear().toString().substr(-2);

      const calculateMaxDate = Date.now() + 315576000000;
      const maxDate = new Date(calculateMaxDate);
      const maxMonth = maxDate.getMonth() + 1;
      const maxYear = maxDate.getFullYear().toString().substr(-2);

      const [expMonth, expYear] = date.split('/');

      if (Number(expYear) < Number(yearToday)) {
        return false;
      } else if (
        Number(expMonth) < monthToday &&
        Number(expYear) <= Number(yearToday)
      ) {
        return false;
      } else if (Number(expYear) > Number(maxYear)) {
        return false;
      } else if (
        Number(expMonth) > Number(maxMonth) &&
        Number(expYear) >= Number(maxYear)
      ) {
        return false;
      }
      return true;
    })
    .test((date) => {
      if (!date) {
        return false;
      }
      const [expMonth] = date.split('/');
      if (Number(expMonth) > 12) {
        return false;
      }
      return true;
    }),
});

export const editModalValidation = yup.object().shape({
  amount: yup
    .string()
    .label('Amount money')
    .min(1)
    .matches(/^\d+(\.\d{0,2})?$/, 'Wrong money format ex: 1234.25')
    .required(),
  currency: yup.string().label('Currency').required(),
});
