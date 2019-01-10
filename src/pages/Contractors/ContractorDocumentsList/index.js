import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'antd';

import NotificationService from '~services/notification';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';
import TooltipButton from '~components/TooltipButton';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import { renderRegularDate } from '~utils/time';
import './ContractorDocumentsList.scss';

const { Column } = Table;

class ContractorDocumentsList extends React.Component {
  static propTypes = {
    userDocuments: PropTypes.arrayOf(PropTypes.object),
    userDocumentsPagination: PropTypes.object,
    isLoading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    userDocuments: [],
    pagination: makeDefaultPagination(),
    userDocumentsPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    const { getUserDocuments, match } = this.props;
    getUserDocuments({
      page: pagination.current,
      limit: pagination.pageSize,
      id: match.params.id,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userDocuments !== prevState.userDocuments) {
      return {
        userDocuments: nextProps.userDocuments,
      };
    }
    if (nextProps.userDocumentsPagination !== prevState.userDocumentsPagination) {
      let pag = prevState.pagination;
      return {
        userDocumentsPagination: nextProps.userDocumentsPagination,
        pagination: { ...pag, total: nextProps.userDocumentsPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getUserDocuments, match } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getUserDocuments({
      page: curr,
      limit: pag.pageSize,
      id: match.params.id,
    });
  };

  handleAdd = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/documents/add`);
  };

  handleDelete = async row => {
    const { deleteUserDocument } = this.props;
    const { name, id } = row;
    Modal.confirm({
      title: `Are you sure you want to delete ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteUserDocument(id);
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: `${name} successfully deleted`,
          });
        } catch (err) {
          NotificationService.open({
            type: 'error',
            message: 'Error',
            description: `Can not delete: ${name}`,
          });
        }
        return this.handleRefresh();
      },
    });
  };

  handleDownload = async row => {
    const { getUserDocumentDownloadLink } = this.props;
    const { name, id } = row;
    try {
      const link = await getUserDocumentDownloadLink(id);
      window.open(link, '_blank');
    } catch (err) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: `Can not download: ${name}`,
      });
    }
  };

  handleGoBack = () => {
    const { history, match } = this.props;
    history.replace(`/contractors/${match.params.id}`);
  };

  handleRefresh = () => {
    const { getUserDocuments, match } = this.props;
    const { pagination } = this.state;
    getUserDocuments({
      page: pagination.current,
      limit: pagination.pageSize,
      id: match.params.id,
    });
  };

  render() {
    const { userDocuments, pagination } = this.state;
    const { isLoading, history } = this.props;
    return (
      <div className="ContractorDocumentsList">
        <div className="ContractorDocumentsList__back">
          <BackBtn history={history} goBack={this.handleGoBack} />
        </div>
        <Header title="Documents List" size="medium">
          <Button type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </Button>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={userDocuments}
            className="ContractorDocumentsList__table"
            rowKey="created"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="left"
              dataIndex="name"
              title="Name"
              render={text => {
                return <div className="ContractorDocumentsList__name">{text}</div>;
              }}
            />
            <Column
              align="left"
              dataIndex="type"
              title="Type"
              render={text => {
                return <div className="ContractorDocumentsList__type">{text}</div>;
              }}
            />
            <Column
              align="center"
              dataIndex="created"
              title="Added On"
              render={renderRegularDate}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return (
                  <div>
                    {/*
                    <TooltipButton tooltip="Download" onClick={() => this.handleDownload(record)}>
                      <Icon type="download" theme="outlined" />
                    </TooltipButton>
                    */}
                    <TooltipButton tooltip="Delete" onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </TooltipButton>
                  </div>
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
  userDocuments: state.users.userDocuments,
  userDocumentsPagination: state.users.userDocumentsPagination,
  isLoading: state.loading.effects.users.getUserDocuments,
});

const mapDispatchToProps = dispatch => ({
  getUserDocuments: dispatch.users.getUserDocuments,
  deleteUserDocument: dispatch.users.deleteUserDocument,
  getUserDocumentDownloadLink: dispatch.users.getUserDocumentDownloadLink,
  unmountUserDocuments: dispatch.users.unmountUserDocuments,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDocumentsList);
