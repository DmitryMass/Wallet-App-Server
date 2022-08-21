import React from 'react';
import { useState } from 'react';
import {
  useDeleteSelectedCashMutation,
  useUpdateSelectedCashMutation,
} from '../../../../../Store/Slice/cashSlice';
import Button from '../../../../Button';
import EditModal from '../../../../Modals/EditModal/EditModal';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import styles from '../cash-balance.m.css';

const CashItem = ({ cash }) => {
  const { t } = useTranslation();
  const { amount, currency, id } = cash;
  const [edit, setEdit] = useState(false);
  const handleEditTrue = () => setEdit(true);
  const handleEditFalse = () => setEdit(false);
  const [updateSelectedCash] = useUpdateSelectedCashMutation();
  const [deleteSelectedCash] = useDeleteSelectedCashMutation();

  const handleSubmitModalForm = async (values, { resetForm }) => {
    try {
      await updateSelectedCash({ ...cash, ...values });
      setEdit(false);
      resetForm();
    } catch (e) {
      alert('Sorry update Error, try later');
    }
  };
  return (
    <>
      <li className={styles.cash__item}>
        <span className={styles.cash__balance}>
          {' '}
          - {new Intl.NumberFormat().format(amount)} {currency}
        </span>
        <span className={styles.cash__btnGroup}>
          <Button handleClick={handleEditTrue} modificator={'edit'}>
            {t('edit')}
          </Button>
          <Button
            handleClick={async () => await deleteSelectedCash(id)}
            modificator={'reversal'}
          >
            {t('delete')}
          </Button>
        </span>
      </li>
      {edit ? (
        <EditModal
          handleSubmitModalForm={handleSubmitModalForm}
          setEdit={handleEditFalse}
        />
      ) : null}
    </>
  );
};

CashItem.propTypes = {
  cash: PropTypes.object,
};

export default CashItem;
