import React from 'react';
import { useState } from 'react';
import { useUpdateCardMutation } from '../../../../Store/Slice/apiSlice';
import Button from '../../../Button';
import EditModal from '../../../Modals/EditModal/EditModal';
import PropTypes from 'prop-types';

import styles from './my-card-item.m.css';

import { useTranslation } from 'react-i18next';

const MyCardItem = ({ card }) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const hanldeEditTrue = () => setEdit(true);
  const handleEditFalse = () => setEdit(false);
  const { amount, currency, scheme } = card;

  const [updateCard] = useUpdateCardMutation();

  const handleSubmitModalForm = async (values, { resetForm }) => {
    try {
      await updateCard({ ...card, ...values });
      setEdit(false);
      resetForm();
    } catch (e) {
      alert('Problem with updating');
    }
  };

  return (
    <>
      <li className={styles.card__item}>
        <span>{scheme}</span>
        <span>
          {amount} {currency}
        </span>
        <Button handleClick={hanldeEditTrue} modificator={'edit'}>
          {t('edit')}
        </Button>
      </li>
      {edit ? (
        <EditModal
          card={card}
          setEdit={handleEditFalse}
          handleSubmitModalForm={handleSubmitModalForm}
        />
      ) : null}
    </>
  );
};

MyCardItem.propTypes = {
  card: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    scheme: PropTypes.string.isRequired,
  }),
};

export default MyCardItem;
