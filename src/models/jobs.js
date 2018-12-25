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
    setEditedJobs(state, payload) {
      return {
        ...state,
        editedJob: payload,
      };
    },
  },
  state: {
    jobsListPagination: null,
    jobsList: [],
    editedJob: null,
  },
};

export default jobs;
