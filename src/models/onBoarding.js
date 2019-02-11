import Http from '~services/http';

const Steps = {
  AGREEMENT: 0,
  PROFILE: 1,
  DOCUMENTS: 2,
  BANK: 3,
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
            case 'profile':
              setup.step = Steps.PROFILE;
              break;
            case 'document':
              setup.step = Steps.DOCUMENTS;
              break;
            case 'bank':
              setup.step = Steps.BANK;
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

    async changeStep(step) {
      switch (step) {
        case Steps.AGREEMENT:
        default:
          break;
        case Steps.PROFILE:
          // process the current contractor status
          await this.checkStep();
          break;
        case Steps.DOCUMENTS:
          // update the contractor status to bank
          dispatch.auth.updateStatus('document');
          break;
        case Steps.BANK:
          // update the contractor status to bank
          dispatch.auth.updateStatus('bank');
          break;
        case Steps.DONE:
          // update the contractor status to active
          dispatch.auth.updateStatus('active');
          break;
      }
      this.setStep(step);
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
