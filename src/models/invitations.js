import _ from 'lodash';
import Http from '~services/http';
import NotificationService from '~services/notification';

const invitations = {
  effects: {
    async getInvitations({ status, page, limit, type }) {
      try {
        const response = await Http.get(`/invitations`, {
          params: {
            page,
            limit,
            status,
            type,
          },
        });
        this.setInvitations(_.orderBy(response.data.items, ['status'], ['asc']));
        this.setInvitationsPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async sendInvitation({ email, type, role }) {
      try {
        const response = await Http.post('/invitations', {
          email,
          type,
          role,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteInvitation({ id }) {
      try {
        const response = await Http.delete(`/invitations/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteUserInvitation({ userId }) {
      try {
        const response = await Http.delete(`/users/${userId}/invitations`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async resendInvitation({ id }) {
      try {
        const response = await Http.post(`/invitations/${id}/resend`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async resendUserInvitation({ userId }) {
      try {
        const response = await Http.post(`/users/${userId}/invitations/resend`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async checkInvitation(id) {
      try {
        let redirect = false;
        const response = await Http.get(`/public/invitations/${id}`);
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
