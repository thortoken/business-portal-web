import _ from 'lodash';
import Http from '~services/http';
import NotificationService from '~services/notification';

const invitations = {
  effects: {
    async sendAdminInvitation({ email }) {
      try {
        const response = await Http.post('users/invitations/admin', {
          email,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async sendContractorInvitation({ email }) {
      try {
        const response = await Http.post('users/invitations/contractors', {
          email,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getInvitations({ status, page, limit }) {
      try {
        const response = await Http.get(`users/invitations`, {
          params: {
            page,
            limit,
            status,
            type: 'contractors',
          },
        });
        this.setInvitations(_.orderBy(response.data.items, ['status'], ['asc']));
        this.setInvitationsPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteInvitation({ userId }) {
      try {
        const response = await Http.delete(`users/${userId}/invitations`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async resendInvitation({ userId }) {
      try {
        const response = await Http.put(`users/${userId}/invitations/resend`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async checkInvitation(id) {
      try {
        let redirect = false;
        const response = await Http.get(`invitations/${id}`);
        if (response.status === 200) {
          this.setInvitedUser(response.data);
        } else {
          let description;
          if (response.status === 406) {
            description = `${response.data.error}. Sign in with your credentials.`;
          } else if (response.status === 404) {
            description = 'Wrong invitation token.';
          } else {
            description = `${response.data.error}`;
          }
          redirect = true;
          NotificationService.open({
            type: 'warning',
            message: 'Warning',
            description,
          });
        }

        return redirect;
      } catch (err) {
        return err.response;
      }
    },
  },
  reducers: {
    setInvitedUser(state, payload) {
      return { ...state, invitedUser: payload };
    },
    setInvitations(state, payload) {
      return { ...state, invitationsList: payload };
    },
    setInvitationsPagination(state, payload) {
      return { ...state, invitationsListPagination: payload };
    },
  },
  state: {
    invitedUser: null,
    invitationsList: [],
    invitationsListPagination: null,
  },
};

export default invitations;
