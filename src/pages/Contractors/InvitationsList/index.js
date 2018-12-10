import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import NotificationService from '~services/notification';

import './InvitationsList.scss';

import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import AddContractorMenu from '../AddContractorMenu';

const { Column } = Table;

class InvitationsList extends React.Component {
  static propTypes = {
    invitationsList: PropTypes.arrayOf(PropTypes.object),
    invitationsListPagination: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    invitationsList: [],
    pagination: makeDefaultPagination(),
    invitationsListPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getInvitations({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.invitationsList !== prevState.invitationsList) {
      return {
        invitationsList: nextProps.invitationsList,
      };
    }
    if (nextProps.invitationsListPagination !== prevState.invitationsListPagination) {
      let pag = prevState.pagination;
      return {
        invitationsListPagination: nextProps.invitationsListPagination,
        pagination: { ...pag, total: nextProps.invitationsListPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getInvitations } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getInvitations({
      page: curr,
      limit: pag.pageSize,
    });
  };

  handleGoContractor = () => {
    this.props.history.push(`/contractors`);
  };

  handleRefresh = () => {
    const { getInvitations } = this.props;
    const { pagination } = this.state;
    getInvitations({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  handleDelete = async row => {
    const { deleteInvitation } = this.props;
    const { email, id } = row;
    Modal.confirm({
      title: `Are you sure you want to delete invitation to ${email}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteInvitation({ id });
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: `Invitation to ${email} successfully deleted.`,
          });
        } catch (err) {
          NotificationService.open({
            type: 'error',
            message: 'Error',
            description: `Can not delete invitation to ${email}`,
          });
        }
        return this.handleRefresh();
      },
    });
  };

  handleResend = async row => {
    const { resendInvitation } = this.props;
    const { email, id } = row;

    try {
      await resendInvitation({ id });
      NotificationService.open({
        type: 'success',
        message: 'Success',
        description: `Invitation to ${email} successfully resent.`,
      });
    } catch (err) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: `Can not resend invitation to ${email}`,
      });
    }
    return this.handleRefresh();
  };

  render() {
    const { invitationsList, pagination } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="InvitationsList">
        <Header title="Invitations List" size="medium">
          <Button type="primary" ghost onClick={this.handleGoContractor}>
            Contractors List
          </Button>
          <AddContractorMenu />
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={invitationsList}
            className="InvitationsList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="left" dataIndex="email" title="Email" />
            <Column
              align="center"
              className="InvitationsList__date"
              dataIndex="createdAt"
              title="Post Date"
              render={text => {
                return (
                  <div>
                    {moment(text)
                      .format('MM/DD/YY, hh:mm')
                      .toString()}
                  </div>
                );
              }}
            />
            <Column
              align="center"
              dataIndex="status"
              title="Status"
              render={text => {
                return (
                  <div
                    className={classnames('InvitationsList__status', {
                      'InvitationsList__status--pending': text === 'pending',
                      'InvitationsList__status--registered': text === 'registered',
                    })}>
                    {text}
                  </div>
                );
              }}
            />
            <Column
              align="center"
              title="Actions"
              className="Invitations__actions"
              render={(text, record) => {
                return (
                  <span className="Invitations__table__buttons">
                    {record.status === 'pending' && (
                      <Tooltip title="Delete invitation.">
                        <Button onClick={() => this.handleDelete(record)}>
                          <Icon type="delete" theme="outlined" />
                        </Button>
                      </Tooltip>
                    )}

                    {record.status === 'pending' && (
                      <Tooltip title="Resend invitation.">
                        <Button onClick={() => this.handleResend(record)}>
                          <Icon type="mail" theme="outlined" />
                        </Button>
                      </Tooltip>
                    )}
                  </span>
                );
              }}
            />
          </Table>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invitationsList: state.invitations.invitationsList,
  invitationsListPagination: state.invitations.invitationsListPagination,
  isLoading: state.loading.effects.invitations.getInvitations,
});

const mapDispatchToProps = dispatch => ({
  getInvitations: dispatch.invitations.getInvitations,
  deleteInvitation: dispatch.invitations.deleteInvitation,
  resendInvitation: dispatch.invitations.resendInvitation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationsList);
