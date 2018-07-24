export default n =>
  new Array(n).fill(1).map((v, i) => ({
    date: new Date(Date.now() - (n - i) * 24 * 3600 * 1000),
    value: parseInt(Math.random() * 1000, 10),
  }));
