import React from 'react';

import { nanoid } from 'nanoid';
import { useGetAllCardsQuery } from '../../../Store/Slice/apiSlice';

import Button from '../../Button';
import Title from '../../Title/Title';

import styles from './my-cards.m.css';
import MyCardItem from './MyCardItem/my-card-item';
import LoadAndError from '../../LoadingAndError/load-n-error';

import { useTranslation } from 'react-i18next';

const MyCards = () => {
  const { t } = useTranslation();
  const { data = [], isLoading, isError } = useGetAllCardsQuery();

  return (
    <div className={styles.cards__wrapper}>
      <Title modificator={'balance'}>{t('my_cards')}</Title>
      {isLoading || isError ? (
        <LoadAndError load={isLoading} error={isError} />
      ) : (
        <ul>
          {data.map((el) => (
            <MyCardItem key={nanoid()} card={el} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCards;
