// После поисков нашел как сделать, никогда не слышал о таком алгоритме
const luhnCheck = (num) => {
  const arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  const lastDigit = arr.shift();
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

export default luhnCheck;
