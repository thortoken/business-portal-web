export const sumTransactions = transactions => {
  return transactions.reduce((prevValue, currValue) => {
    return +prevValue + currValue.job.value * currValue.quantity;
  }, 0);
};
