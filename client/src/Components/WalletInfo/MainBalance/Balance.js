import React from 'react';
import LoadAndError from '../../LoadingAndError/load-n-error';

import Title from '../../Title/Title';
import useCalculateAmount from '../../useCalculateAmount/useCalculateAmount';

import styles from './balance.m.css';
import BalanceItem from './BalanceItem/BalanceItem';
import CashBalance from './CashBalance/CashBalance';

import { useTranslation } from 'react-i18next';

const Balance = () => {
  const { t } = useTranslation();
  const { isLoading, isError, newBalanceUah, newBalanceEur, newBalanceUsd } =
    useCalculateAmount();

  return (
    <div className={styles.balance__container}>
      <div className={styles.balance__overall}>
        <Title modificator={'balance'}>{t('balance')}</Title>
        {isLoading || isError ? (
          <LoadAndError load={isLoading} error={isError} />
        ) : (
          <div className={styles.balance__total}>
            <BalanceItem modificator={styles.balance__total_ua}>
              - {new Intl.NumberFormat().format(newBalanceUah)} UAH
            </BalanceItem>
            <BalanceItem modificator={styles.balance__total_usd}>
              - {new Intl.NumberFormat().format(newBalanceUsd)} USD
            </BalanceItem>
            <BalanceItem modificator={styles.balance__total_eur}>
              - {new Intl.NumberFormat().format(newBalanceEur)} EUR
            </BalanceItem>
          </div>
        )}
      </div>
      <CashBalance />
    </div>
  );
};

export default Balance;
