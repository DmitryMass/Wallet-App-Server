import React from 'react';
import NewCardForm from '../../Forms/NewCardForm/NewCardForm';
import Title from '../../Title/Title';

import styles from './add-card-modal.m.css';
import { useTranslation } from 'react-i18next';

const AddCardModal = ({ setModal }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.modal} onClick={() => setModal(false)}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Title modificator={'form'}>{t('new_card')}</Title>
        <NewCardForm setModal={setModal} />
      </div>
    </div>
  );
};

export default AddCardModal;
