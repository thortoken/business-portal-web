import Http from '../services/http';

const jobs = {
  effects: {
    async getJobs({ page, limit }) {
      try {
        const response = await Http.get('/jobs', {
          params: {
            page,
            limit,
          },
        });
        this.setJobsList(response.data.items);
        this.setJobsPagination(response.data.pagination);
      } catch (err) {
        throw err;
      }
    },
    async changeJobStatus({ id, isActive }) {
      try {
        const response = await Http.patch(`/jobs/${id}`, { isActive: !isActive });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteJob(id) {
      console.log('deleted');
    },
  },
  reducers: {
    setJobsPagination(state, payload) {
      return {
        ...state,
        jobsListPagination: payload,
      };
    },
    setJobsList(state, payload) {
      return {
        ...state,
        jobsList: payload,
      };
    },
  },
  state: {
    jobsListPagination: null,
    jobsList: [],
  },
};

export default jobs;
