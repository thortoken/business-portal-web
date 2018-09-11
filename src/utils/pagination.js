const makeDefaultPagination = () => ({
  pageSizeOptions: ['2', '5', '10', '20', '50', '100'],
  showSizeChanger: true,
  defaultPageSize: 10,
  current: 1,
  pageSize: 10,
  total: 0,
});
export default makeDefaultPagination;
