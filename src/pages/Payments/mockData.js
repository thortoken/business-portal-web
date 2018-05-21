export default n => {
  const rows = [];
  for (let i = 0; i < n; ++i) {
    rows.push({
      key: i,
      transId: 11067 + i,
      customerId: 'Jenna Elfman',
      received: 189.95 + i * 0.1,
      transId2: 10458 + i,
      contractor: 'Jordy Bahm',
      paid: 110.45 + i * 0.2,
      date: new Date('2018-04-25T11:22:33'),
    });
  }
  return rows;
};
