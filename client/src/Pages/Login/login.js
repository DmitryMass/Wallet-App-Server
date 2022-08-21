import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Title from '../../Components/Title';
import Button from '../../Components/Button';
import InputField from '../../Components/InputField';
import AuthTitle from '../../Components/Login-Register/Auth-Title';
import { authScheme } from '../../Components/ValidationScheme/auth-scheme';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../Store/Slice/Login-Register/login-register-slice';

import styles from '../Register/register.m.css';
import { loginSuccess } from '../../Store/Features/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { error, isError, isLoading }] = useLoginMutation();

  const handleLogin = async (values) => {
    const body = new FormData();
    Object.entries(values).forEach((item) => {
      body.append(item[0], item[1]);
    });
    try {
      const data = await login(body);
      if (data.data.info === 'Ok') {
        localStorage.setItem('user', true);
        dispatch(loginSuccess());
        navigate('/wallet');
      }
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
            subtitle={t('haveSignIn')}
            sign={t('signUp')}
            link={'/registration'}
          />
          <Title modificator={'auth'}>{t('signIn')}</Title>
          <div className={styles.register__form}>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
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
                <Button type={'submit'} modificator={'success '}>
                  {t('signIn')}
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
