import React from 'react';
import { Formik, Field, Form } from 'formik';

import InputField from '../../InputField/InputField';
import { newCardValidation } from '../../ValidationScheme/ValidationScheme';
import luhnCheck from '../../ValidationScheme/LuhnValidator';
import { useLazyGetCardSchemeQuery } from '../../../Store/Slice/checkerSliceApi';

import styles from './new-card-form.m.css';
import { useAddNewCardMutation } from '../../../Store/Slice/apiSlice';

import { useTranslation } from 'react-i18next';

const NewCardForm = ({ setModal }) => {
  const { t } = useTranslation();
  const [getCardScheme] = useLazyGetCardSchemeQuery();
  const [addNewCard] = useAddNewCardMutation();

  const handleSubmit = async (values, { resetForm }) => {
    const checkNum = Number(
      values.cardNumber.toString().split('').slice(0, 8).join('')
    );
    const bank = values.bank.replace(/\s+/g, ' ').trim();
    try {
      if (!luhnCheck(values.cardNumber.toString())) {
        throw new Error();
      }
      const { data } = await getCardScheme(checkNum);
      await addNewCard({
        ...values,
        bank,
        scheme: data.scheme,
        type: data.type,
      });
      setModal(false);
    } catch (e) {
      alert('Wrond Card Number');
    }
    resetForm();
  };

  return (
    <div className={styles.form__wrapper}>
      <Formik
        initialValues={{
          cardNumber: '',
          date: '',
          cvv: '',
          amount: '',
          currency: 'UAH',
          bank: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={newCardValidation}
      >
        <Form>
          <Field
            id='bank'
            name='bank'
            component={InputField}
            placeholder={t('nameCard')}
          />
          <Field
            id='cardNumber'
            name='cardNumber'
            type='number'
            component={InputField}
            placeholder={t('cardNum')}
          />

          <div>
            <Field
              id='date'
              name='date'
              type='text'
              component={InputField}
              placeholder={t('cardDate')}
            />
            <Field
              id='cvv'
              name='cvv'
              type='number'
              component={InputField}
              placeholder={t('cardCvv')}
            />
          </div>
          <div className={styles.form__amount}>
            <Field
              id='amount'
              name='amount'
              type='number'
              component={InputField}
              placeholder={t('amount')}
            />
            <Field
              className='form__select'
              component='select'
              id='currency'
              name='currency'
              type='select'
            >
              <option value='UAH'>UAH</option>
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
            </Field>
          </div>
          <div className={styles.form__btnGroup}>
            <button className='button button__success' type='submit'>
              {t('new_card')}
            </button>
            <button
              className={`button button__form ${styles.form__btnCancel}`}
              onClick={() => setModal(false)}
              type='button'
            >
              {t('cancel')}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewCardForm;
