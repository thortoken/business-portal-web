import Http from '~services/http';

const invitations = {
  effects: {
    async sendInvite({ email }) {
      try {
        const response = await Http.post('/contractors/invitations/', {
          email,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getInvitations({ status, page, limit }) {
      try {
        const response = await Http.get(`/contractors/invitations/`, {
          params: {
            page,
            limit,
            status,
          },
        });
        this.setInvitations(response.data);
        this.setInvitationsPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setInvitations(state, payload) {
      return { ...state, invitationsList: payload };
    },
    setInvitationsPagination(state, payload) {
      return { ...state, invitationsListPagination: payload };
    },
  },
  state: {
    invitationsList: [],
    invitationsListPagination: null,
  },
};

export default invitations;
