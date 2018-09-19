import Http from '../services/http';

const jobs = {
  state: {
    currentJob: {
      description: 'Changing engine oil',
      id: 'b59bddb2-bb4b-11e8-8562-6a00039c60e0',
      name: 'Oil change',
      value: '4.75',
    },
    jobs: [],
  },
  effects: {
    async getJob(id) {
      try {
        const response = await Http.get(`/jobs/${id}`);

        this.setCurrentJob(response.data);
      } catch (err) {
        throw err;
      }
    },
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
    setJob(state, payload) {
      return { ...state, currentJob: payload };
    },
    setJobs(state, action) {
      return {
        ...state,
        jobs: action.items,
      };
    },
  },
};

export default jobs;
