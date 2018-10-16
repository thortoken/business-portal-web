import Http from '~services/http';

const onBoarding = {
  effects: {
    async checkInvitation(id) {
      try {
        const response = await Http.get(`/contractorsInvitations/${id}`);
        this.setContractor(response.data);
        return response;
      } catch (err) {
        return err.response;
      }
    },
    async getAgreement() {
      const agreement = localStorage.getItem('thor-terms-agreement');
      if (agreement) {
        this.setAgreement({ agreement: true, step: 1 });
      } else {
        this.setAgreement({ agreement: false, step: 0 });
      }
    },
    async saveAgreement(value) {
      if (value) {
        localStorage.setItem('thor-terms-agreement', 'true');
      } else {
        localStorage.removeItem('thor-terms-agreement');
      }
    },
    async create(data) {
      try {
        const response = await Http.post('/contractors', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setContractor(state, payload) {
      return { ...state, contractor: payload };
    },
    setAgreement(state, payload) {
      return { ...state, agreement: payload.agreement, step: payload.step };
    },
  },
  state: {
    contractor: null,
    agreement: false,
    step: 0,
  },
};

export default onBoarding;
