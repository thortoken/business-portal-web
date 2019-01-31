const Steps = {
  PROFILE: 0,
  COMPANY: 1,
  BANK: 2,
  DONE: 3,
};

const welcome = {
  effects: dispatch => ({
    async checkStep(_payload, models) {
      let redirect = false;
      let step = Steps.PROFILE;
      let tenantStatus = models.tenants.tenant.status;
      let userStatus = models.auth.user.status;

      if (userStatus === 'profile') {
        step = Steps.PROFILE;
      } else {
        switch (tenantStatus) {
          case 'company':
            step = Steps.COMPANY;
            break;
          case 'bank':
            step = Steps.BANK;
            break;
          default:
            step = Steps.DONE;
            redirect = true;
            break;
        }
      }
      this.setStep(step);
      return redirect;
    },

    async changeStep(step) {
      switch (step) {
        case Steps.PROFILE:
        default:
          break;
        case Steps.COMPANY:
          // process the current tenant status
          await this.checkStep();
          break;
        case Steps.BANK:
          // update the tenant status to bank
          dispatch.tenants.updateStatus('bank');
          break;
        case Steps.DONE:
          // update the tenant status to active
          dispatch.tenants.updateStatus('active');
          break;
      }
      this.setStep(step);
    },
  }),
  reducers: {
    setStep(state, payload) {
      return { ...state, step: payload, ready: true };
    },
  },
  state: {
    step: 0,
    ready: false,
  },
};

export default welcome;
