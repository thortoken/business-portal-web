export default n => {
  const rows = [];
  for (let i = 0; i < n; ++i) {
    rows.push({
      key: i,
      transId: 11067 + i,
      serviceDate: new Date('2018-04-25T11:22:33'),
      service: ['Oil Change'],
      payment: 110.45 + i * 0.2,
      contractor: 'Jordy Bahm',
      date: new Date('2018-04-25T11:22:33'),
      city: 'San Francisco',
    });
  }
  return rows;
};
