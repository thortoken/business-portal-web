import Http from '../services/http';

const jobs = {
  effects: {
    async getJobs({ page, limit, name, isActive, order, orderBy, isCustom }) {
      try {
        const response = await Http.get('/jobs', {
          params: {
            page,
            limit,
            orderBy,
            order,
            name,
            isActive,
            isCustom,
          },
        });
        this.setJobList(response.data.items);
        this.setJobPagination(response.data.pagination);
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

    async addJob(data) {
      try {
        const response = await Http.post(`/jobs`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async updateJob(data) {
      try {
        const response = await Http.patch(`/jobs/${data.id}`, data);
        this.setEditedJobs(null);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getJob(id) {
      try {
        const response = await Http.get(`/jobs/${id}`);
        this.setEditedJobs(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteJob(id) {
      try {
        const response = await Http.delete(`/jobs/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setJobPagination(state, payload) {
      return {
        ...state,
        jobPagination: payload,
      };
    },
    setJobList(state, payload) {
      return {
        ...state,
        jobList: payload,
      };
    },
    setEditedJobs(state, payload) {
      return {
        ...state,
        editedJob: payload,
      };
    },
  },
  state: {
    jobList: [],
    jobPagination: null,
    editedJob: null,
  },
};

export default jobs;
