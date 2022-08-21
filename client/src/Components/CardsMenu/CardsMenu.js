import React from 'react';
import {
  useAddNewCardMutation,
  useGetAllCardsQuery,
  useLazyGetAllCardsQuery,
} from '../../Store/Slice/apiSlice';

import Button from '../Button';
import CardItem from './CardItem/CardItem';

import { nanoid } from 'nanoid';
import styles from './cards-menu.m.css';
import AddCardModal from '../Modals/AddCardModal/AddCardModal';
import { useState } from 'react';
import LoadAndError from '../LoadingAndError/load-n-error';
import EditModal from '../Modals/EditModal/EditModal';
import { useAddNewCashMutation } from '../../Store/Slice/cashSlice';

import { useTranslation } from 'react-i18next';

const CardsMenu = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const { data = [], isLoading, isError } = useGetAllCardsQuery();
  const [addNewCash] = useAddNewCashMutation();

  const handleSubmitModalForm = async (values, { resetForm }) => {
    try {
      await addNewCash({ ...values });
      setCashModal(false);
      resetForm('');
    } catch (e) {
      alert('Problem with Adding Cash');
    }
  };

  const handleEditFalse = () => setCashModal(false);
  return (
    <div>
      {modal ? <AddCardModal setModal={setModal} /> : null}
      {cashModal ? (
        <EditModal
          handleSubmitModalForm={handleSubmitModalForm}
          setEdit={handleEditFalse}
        />
      ) : null}
      {isLoading || isError ? (
        <LoadAndError load={isLoading} error={isError} />
      ) : (
        <>
          <nav className={styles.cards__navigate}>
            <Button
              handleClick={() => setModal((prev) => !prev)}
              modificator={'success'}
            >
              {t('new_card')}
            </Button>
            <Button
              handleClick={() => setCashModal((prev) => !prev)}
              modificator={'success'}
            >
              {t('new_cash')}
            </Button>
          </nav>
          <div>
            {data.length === 0 ? (
              <div>{t('no_cash')}</div>
            ) : (
              data.map((card) => <CardItem key={nanoid()} card={card} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardsMenu;
