export const sumTransactions = transactions => {
  return transactions.reduce((prevValue, currValue) => {
    return +prevValue + currValue.value * currValue.quantity;
  }, 0);
};
