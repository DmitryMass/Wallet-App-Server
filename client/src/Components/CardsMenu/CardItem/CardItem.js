import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import CopyToClipboard from 'react-copy-to-clipboard';

import mastercard from '../../../Assets/Icons/mastercard.svg';
import visa from '../../../Assets/Icons/visa.svg';
import styles from './card-item.m.css';
import { useDeleteCardMutation } from '../../../Store/Slice/apiSlice';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CardItem = ({ card }) => {
  const { t } = useTranslation();
  const { id, bank, cvv, currency, amount, date, cardNumber, scheme, type } =
    card;
  const [deleteCard] = useDeleteCardMutation();
  const [copy, setCopy] = useState(false);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (copy) setCopy(false);
    }, 2000);
  }, [copy]);

  useEffect(() => {
    setTimeout(() => {
      if (showCard) setShowCard(false);
    }, 3000);
  }, [showCard]);

  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__card}>
        <div className={styles.card__name}>
          <h5>{bank}</h5>
          <div className={styles.card__type}>
            {scheme === 'mastercard' ? (
              <div className={styles.card__scheme}>
                <object data={mastercard} type='' />
              </div>
            ) : scheme === 'visa' ? (
              <div className={styles.card__scheme}>
                <object data={visa} type='' />
              </div>
            ) : (
              <span>{scheme}</span>
            )}
            <span>{type}</span>
          </div>
        </div>
        <div className={styles.card__amount}>
          <span>{new Intl.NumberFormat().format(amount)}</span>{' '}
          <span>{currency}</span>
        </div>
        <div className={styles.card__number}>
          <div
            className={styles.card__number_show}
            onClick={() => setShowCard(true)}
          >
            {showCard ? (
              <span>
                {cardNumber.toString().slice(0, 4)}{' '}
                {cardNumber.toString().slice(5, 9)}{' '}
                {cardNumber.toString().slice(10, 14)}{' '}
                {cardNumber.toString().slice(12, 16)}
              </span>
            ) : (
              <span>
                {cardNumber.toString().slice(0, 4)}{' '}
                {cardNumber.toString().slice(5, 9).replaceAll(/[0-9]/gi, '*')}{' '}
                {cardNumber.toString().slice(10, 14).replaceAll(/[0-9]/gi, '*')}{' '}
                {cardNumber.toString().slice(12, 16)}
              </span>
            )}
          </div>
          <div className={styles.card__copy}>
            <CopyToClipboard text={cardNumber} onCopy={() => setCopy(true)}>
              <button className={styles.card__copy_btn}>{t('copy')}</button>
            </CopyToClipboard>
            {copy ? <span>{t('copied')}</span> : null}
          </div>
        </div>
        <div className={styles.card__date}>{date}</div>
      </div>
      <Button
        handleClick={async () => await deleteCard(id)}
        modificator={'reversal'}
      >
        {t('delete')}
      </Button>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.any.isRequired,
    bank: PropTypes.string.isRequired,
    cvv: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    cardNumber: PropTypes.any.isRequired,
    scheme: PropTypes.string.isRequired,
  }),
};

export default CardItem;
