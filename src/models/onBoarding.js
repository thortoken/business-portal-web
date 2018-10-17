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

      if (models.auth.token === null) {
        const invitationResponse = await this.checkInvitation(invitationToken);
        if (localStorage.getItem('thor-terms-agreement') && invitationResponse.status === 200) {
          setup.agreement = true;
          setup.step = 1;
          setup.contractor = invitationResponse.data;
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
    async checkInvitation(id) {
      try {
        const response = await Http.get(`/contractorsInvitations/${id}`);
        this.setContractor(response.data);
        return response;
      } catch (err) {
        return err.response;
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
    async createFundingSource(data, token) {
      setAuthHeader(token);
      try {
        const response = await Http.post('/contractors/fundingSources/', data);
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
    setStep(state, payload) {
      return { ...state, step: payload };
    },
    setupOnBoarding(state, payload) {
      return { ...state, ...payload };
    },
  },
  state: {
    contractor: null,
    agreement: false,
    step: 0,
    ready: false,
  },
};

export default onBoarding;
