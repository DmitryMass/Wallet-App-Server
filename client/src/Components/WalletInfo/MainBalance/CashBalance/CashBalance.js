import React from 'react';
import { nanoid } from 'nanoid';

import LoadAndError from '../../../LoadingAndError/load-n-error';
import Title from '../../../Title/Title';

import styles from './cash-balance.m.css';
import CashItem from './CashItem/CashItem';
import { useGetAllCashQuery } from '../../../../Store/Slice/cashSlice';
import { useTranslation } from 'react-i18next';

const CashBalance = () => {
  const { t } = useTranslation();
  const { data = [], isLoading, isError } = useGetAllCashQuery();
  return (
    <div className={styles.cash__wrapper}>
      <Title modificator={'balance'}>{t('cash')}</Title>
      {isLoading || isError ? (
        <LoadAndError load={isLoading} error={isError} />
      ) : (
        <ul className={styles.cash__balance}>
          {data.length === 0 ? (
            <div>{t('no_money')}</div>
          ) : (
            data.map((cash) => <CashItem key={nanoid()} cash={cash} />)
          )}
        </ul>
      )}
    </div>
  );
};

export default CashBalance;
