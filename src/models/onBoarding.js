import Http, { setAuthHeader } from '~services/http';
import NotificationService from '~services/notification';

const onBoarding = {
  effects: {
    async checkStep({ invitationToken }, models) {
      let redirect = false;
      let setup = {
        step: 0,
        agreement: false,
        contractor: null,
        ready: false,
      };

      if (models.auth.token === null && !models.auth.loggedOut) {
        const invitationResponse = await this.checkInvitation(invitationToken);
        setup.contractor = invitationResponse.data;
        if (localStorage.getItem('thor-terms-agreement') && invitationResponse.status === 200) {
          setup.agreement = true;
          setup.step = 1;
        } else {
          setup.agreement = false;
          if (invitationResponse.status === 406) {
            redirect = true;
            NotificationService.open({
              type: 'warning',
              message: 'Warning',
              description: `${invitationResponse.data.error}. Sign in with your credentials.`,
            });
          } else if (invitationResponse.status === 404) {
            redirect = true;
            NotificationService.open({
              type: 'warning',
              message: 'Warning',
              description: 'Wrong invitation token.',
            });
          }
        }
      } else {
        setup.step = 2;
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
    async getIavToken(token) {
      setAuthHeader(token);
      try {
        const response = await Http.get('/contractors/fundingSources/iav');
        this.setIavToken(response.data.token);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
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
        this.setContractor(response.data);
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
      setAuthHeader(data.token);
      try {
        const response = await Http.post('/contractors/fundingSources/', data.bank);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async createFundingSourceWithIAV(data) {
      console.log(data);
      setAuthHeader(data.token);
      try {
        const response = await Http.post('/contractors/fundingSources/iav', data.bank);
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
    setStep(state, payload) {
      return { ...state, step: payload };
    },
    setupOnBoarding(state, payload) {
      return { ...state, ...payload };
    },
    setIavToken(state, payload) {
      return { ...state, iavToken: payload };
    },
    setFsData(state, payload) {
      return { ...state, fsData: payload };
    },
  },
  state: {
    contractor: null,
    agreement: false,
    step: 0,
    ready: false,
    iavToken: '',
    fsData: null,
  },
};

export default onBoarding;
