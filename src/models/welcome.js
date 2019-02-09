const Steps = {
  COMPANY: 0,
  OWNERS: 1,
  BANK: 2,
  DONE: 3,
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
      let redirect = false;
      let step = Steps.COMPANY;

      try {
        const company = models.tenantCompany.company || (await dispatch.tenantCompany.getCompany());
        if (company) {
          if (company.businessType !== 'soleProprietorship') {
            step = Steps.OWNERS;
          } else {
            step = Steps.BANK;
          }
        }

        if (step === Steps.OWNERS) {
          let owners = models.beneficialOwners.owners;
          if (!owners || owners.length === 0) {
            owners = await dispatch.beneficialOwners.getBeneficialOwners();
          }
          if (owners && owners.length > 0) {
            step = Steps.BANK;
          }
        }

        if (step === Steps.BANK) {
          let linkedAccounts = models.linkedAccounts.fundingSources;
          if (!linkedAccounts || linkedAccounts.length === 0) {
            linkedAccounts = await dispatch.linkedAccounts.getFundingSource();
          }
          if (linkedAccounts && linkedAccounts.length > 0) {
            dispatch.tenants.updateStatus('active');
            step = Steps.DONE;
            redirect = true;
          }
        }
      } catch (error) {
        // catch is okay, just means missing something
      }

      this.setStep(step);
      return redirect;
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
