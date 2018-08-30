import Http from '../services/http';

const jobs = {
  state: {
    jobs: [],
  },
  effects: {
    async getJobs() {
      try {
        const response = await Http.get('/jobs');

        this.setJobs(response.data);
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setJobs(state, action) {
      return {
        ...state,
        jobs: action.items,
      };
    },
  },
};

export default jobs;
