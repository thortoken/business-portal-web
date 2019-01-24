import Http from '~services/http';

const Steps = {
  AGREEMENT: 0,
  SIGNUP: 1,
  BANK: 2,
  DOCUMENTS: 3,
  DONE: 4,
};

const onBoarding = {
  effects: dispatch => ({
    async checkStep(_payload, models) {
      let redirect = false;
      let setup = {
        step: Steps.AGREEMENT,
        agreement: false,
        ready: false,
      };

      if (models.auth.user.status) {
        if (localStorage.getItem('thor-terms-agreement')) {
          setup.agreement = true;
          switch (models.auth.user.status) {
            case 'tax':
              setup.step = Steps.SIGNUP;
              break;
            case 'bank':
              setup.step = Steps.BANK;
              break;
            case 'documents':
              setup.step = Steps.DOCUMENTS;
              break;
            case 'active':
            default:
              setup.step = Steps.DONE;
              redirect = true;
              break;
          }
        } else {
          setup.agreement = false;
        }
      }
      setup.ready = true;
      this.setupOnBoarding(setup);
      return redirect;
    },

    changeStep(step) {
      this.setStep(step);
    },

    async createFundingSourceData(data) {
      this.setFsData(data);
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

    async createContractor(data) {
      try {
        const response = await Http.post('/contractors', data);

        await dispatch.auth.saveUser(response.data.tenantProfile);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async checkFundingSource() {
      try {
        const response = await Http.get('/contractors/fundingSources/default');
        return response.data;
      } catch (err) {
        return err.response;
      }
    },

    async createFundingSource(data) {
      try {
        const response = await Http.post('/contractors/fundingSources/', data.bank);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async createFundingSourceWithIAV(data) {
      try {
        const response = await Http.post('/contractors/fundingSources/iav', data.bank);
        // TODO: update with real status?
        await dispatch.auth.saveUser({ status: 'active' });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  }),
  reducers: {
    setAgreement(state, payload) {
      return { ...state, agreement: payload.agreement, step: payload.step };
    },
    setStep(state, payload) {
      return { ...state, step: payload };
    },
    setupOnBoarding(state, payload) {
      return { ...state, ...payload };
    },
  },
  state: {
    agreement: false,
    step: 0,
    ready: false,
  },
};

export default onBoarding;
