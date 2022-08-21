import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import InputField from '../../Components/InputField/InputField';
import Button from '../../Components/Button';
import AuthTitle from '../../Components/Login-Register/Auth-Title/Auth-Title';
import Title from '../../Components/Title';
import { authScheme } from '../../Components/ValidationScheme/auth-scheme';

import { useTranslation } from 'react-i18next';

import { useRegistrationMutation } from '../../Store/Slice/Login-Register/login-register-slice';
import styles from './register.m.css';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [registration, { isLoading, error, isError }] =
    useRegistrationMutation();

  const handleRegistration = async (values) => {
    const body = new FormData();
    Object.entries(values).forEach((item) => {
      body.append(item[0], item[1]);
    });
    try {
      const data = await registration(body);
      !data.error && navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.register}>
      <div className='container'>
        <div className={styles.register__wrapper}>
          <AuthTitle
            title={t('welcome')}
            myApp={t('myApp')}
            subtitle={t('haveSignUp')}
            sign={t('signIn')}
            link={'/login'}
          />
          <Title modificator={'auth'}>{t('signUp')}</Title>
          <div className={styles.register__form}>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              onSubmit={handleRegistration}
              validationSchema={authScheme}
            >
              <Form className={styles.form}>
                {isLoading && <div>Loading...</div>}
                {isError && error.status === 400 && (
                  <span>{error.data.info}</span>
                )}
                {isError && error.status > 400 && (
                  <span>Sorry server is down...</span>
                )}
                {isError && error.status === 'FETCH_ERROR' && (
                  <span>Failed to fetch data</span>
                )}
                <Field
                  id='email'
                  name='email'
                  type='text'
                  component={InputField}
                  placeholder={t('authEmail')}
                />
                <Field
                  id='password'
                  name='password'
                  type='password'
                  component={InputField}
                  placeholder={t('authPassword')}
                />
                <Field
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  component={InputField}
                  placeholder={t('confirmPassword')}
                />
                <Button type={'submit'} modificator={'success '}>
                  {t('signUp')}
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
