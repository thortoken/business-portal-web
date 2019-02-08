const Steps = {
  COMPANY: 0,
  BANK: 1,
  DONE: 2,
};

const welcome = {
  effects: dispatch => ({
    async checkStatus(_payload, models) {
      let tenantStatus = models.tenants.tenant.status;
      let userStatus = models.auth.user.status;

      if (userStatus !== 'active') {
        return '/create-profile';
      }

      if (!tenantStatus) {
        const { status } = await dispatch.tenants.getTenant();
        if (status !== 'active') {
          return '/welcome';
        }
      } else if (tenantStatus !== 'active') {
        return '/welcome';
      }
      return null;
    },

    async checkStep(_payload, models) {
      const tenantStatus = models.tenants.tenant.status;
      let redirect = false;
      let step = Steps.PROFILE;

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
      this.setStep(step);
      return redirect;
    },

    async changeStep(step) {
      switch (step) {
        case Steps.COMPANY:
        default:
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
