import { useGetAllCardsQuery } from '../../Store/Slice/apiSlice';
import { useGetAllCashQuery } from '../../Store/Slice/cashSlice';

const useCalculateAmount = () => {
  const { data = [], isLoading, isError } = useGetAllCardsQuery();
  const { data: cash = [] } = useGetAllCashQuery();

  const calculate = (data, currency) => {
    return data
      .filter((card) => card.currency === currency)
      .reduce((prev, curr) => {
        return prev + curr.amount;
      }, 0);
  };

  const newCalculate = (firstNum, secondNum) => {
    return firstNum + secondNum;
  };

  const balanceCashUAH = calculate(cash, 'UAH');
  const balanceCashUSD = calculate(cash, 'USD');
  const balanceCashEUR = calculate(cash, 'EUR');

  const balanceUAH = calculate(data, 'UAH');
  const balanceUSD = calculate(data, 'USD');
  const balanceEUR = calculate(data, 'EUR');

  const newBalanceUah = newCalculate(balanceCashUAH, balanceUAH);
  const newBalanceUsd = newCalculate(balanceCashUSD, balanceUSD);
  const newBalanceEur = newCalculate(balanceCashEUR, balanceEUR);

  return {
    newBalanceUsd,
    newBalanceUah,
    newBalanceEur,
    isLoading,
    isError,
  };
};

export default useCalculateAmount;
