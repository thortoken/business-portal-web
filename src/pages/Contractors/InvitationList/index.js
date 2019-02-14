import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'antd';
import moment from 'moment';
import classnames from 'classnames';

import Box from '~components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import NotificationService from '~services/notification';
import TooltipButton from '~components/TooltipButton';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import AddContractorMenu from '../ContractorList/components/AddContractorMenu';
import './InvitationList.scss';

const { Column } = Table;

class InvitationList extends React.Component {
  static propTypes = {
    invitationList: PropTypes.arrayOf(PropTypes.object),
    invitationPagination: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    invitationList: [],
    pagination: makeDefaultPagination(),
    invitationPagination: null,
  };

  componentDidMount() {
    this.handleRefresh();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.invitationList !== prevState.invitationList) {
      return {
        invitationList: nextProps.invitationList,
      };
    }
    if (nextProps.invitationPagination !== prevState.invitationPagination) {
      let pag = prevState.pagination;
      return {
        invitationPagination: nextProps.invitationPagination,
        pagination: { ...pag, total: nextProps.invitationPagination.total },
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
      type: 'contractor',
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
      type: 'contractor',
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
          await deleteInvitation({ userId: id });
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
    const { invitationList, pagination } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="InvitationList">
        <Header title="Invitation List" size="medium">
          <Button type="primary" ghost onClick={this.handleGoContractor}>
            Contractors List
          </Button>
          <AddContractorMenu />
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={invitationList}
            className="InvitationList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="left" dataIndex="email" title="Email" />
            <Column
              align="center"
              className="InvitationList__date"
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
                      'InvitationList__status--pending': text === 'pending',
                      'InvitationList__status--registered': text === 'registered',
                    })}>
                    {text}
                  </div>
                );
              }}
            />
            <Column
              align="center"
              title="Actions"
              className="Invitation__actions"
              render={(text, record) => {
                return (
                  <span className="Invitation__table__buttons">
                    {record.status === 'pending' && (
                      <TooltipButton
                        tooltip="Delete invitation"
                        onClick={() => this.handleDelete(record)}>
                        <Icon type="delete" theme="outlined" />
                      </TooltipButton>
                    )}

                    {record.status === 'pending' && (
                      <TooltipButton
                        tooltip="Resend invitation"
                        onClick={() => this.handleResend(record)}>
                        <Icon type="mail" theme="outlined" />
                      </TooltipButton>
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
  invitationList: state.invitations.invitationList,
  invitationPagination: state.invitations.invitationPagination,
  isLoading: state.loading.effects.invitations.getInvitations,
});

const mapDispatchToProps = dispatch => ({
  getInvitations: dispatch.invitations.getInvitations,
  deleteInvitation: dispatch.invitations.deleteInvitation,
  resendInvitation: dispatch.invitations.resendInvitation,
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitationList);
