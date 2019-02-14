import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon, Modal } from 'antd';
import classnames from 'classnames';

import NotificationService from '~services/notification';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';
import TooltipButton from '~components/TooltipButton';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import AddDocumentModal from './components/AddDocumentModal';
import { renderRegularDate } from '~utils/time';
import './DocumentList.scss';

const { Column } = Table;

class DocumentList extends React.Component {
  static propTypes = {
    documentList: PropTypes.arrayOf(PropTypes.object),
    documentPagination: PropTypes.object,
    isLoading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    document: {},
    documentList: [],
    pagination: makeDefaultPagination(),
    documentPagination: null,
    isAddDocumentModalVisible: false,
    match: null,
  };

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.props.unmountDocumentList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.documentList !== prevState.documentList) {
      return {
        documentList: nextProps.documentList,
      };
    }
    if (nextProps.documentPagination !== prevState.documentPagination) {
      let pag = prevState.pagination;
      return {
        documentPagination: nextProps.documentPagination,
        pagination: { ...pag, total: nextProps.documentPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getDocumentList, match } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getDocumentList({
      page: curr,
      limit: pag.pageSize,
      userId: match.params.id,
    });
  };

  handleRefresh = () => {
    const { getDocumentList, match } = this.props;
    const { pagination } = this.state;
    getDocumentList({
      page: pagination.current,
      limit: pagination.pageSize,
      userId: match.params.id,
    });
  };

  handleAdd = row => {
    this.setState({ document: { ...row }, isAddDocumentModalVisible: true });
  };

  onChangeVisibility = (isAddDocumentModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleRefresh();
    }
    this.setState({ isAddDocumentModalVisible });
  };

  handleDelete = async row => {
    const { deleteDocument, match } = this.props;
    const { name, id } = row;
    Modal.confirm({
      title: `Are you sure you want to delete ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteDocument({ userId: match.params.id, id });
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
    const { getDocumentDownloadLink } = this.props;
    const { name, id } = row;
    try {
      const link = await getDocumentDownloadLink(id);
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

  render() {
    const { documentList, pagination, isAddDocumentModalVisible, document } = this.state;
    const { isLoading, history, token, match } = this.props;
    return (
      <div className="DocumentList">
        <AddDocumentModal
          userId={match.params.id}
          token={token}
          document={document}
          isModalVisible={isAddDocumentModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={this.handleRefresh}
        />
        <div className="DocumentList__back">
          <BackBtn history={history} goBack={this.handleGoBack} />
        </div>
        <Header title="Document List" size="medium">
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={documentList}
            className="DocumentList__table"
            rowKey="createdAt"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="left"
              dataIndex="name"
              title="Name"
              render={text => {
                return <div className="DocumentList__name">{text}</div>;
              }}
            />
            <Column
              align="center"
              dataIndex="status"
              title="Status"
              render={text => {
                return (
                  <div
                    className={classnames('DocumentList__status', {
                      'DocumentList__status--pending': text === 'pending',
                      'DocumentList__status--approved': text === 'approved',
                      'DocumentList__status--rejected': text === 'rejected',
                    })}>
                    {text}
                  </div>
                );
              }}
            />
            <Column
              align="center"
              dataIndex="createdAt"
              title="Added On"
              render={renderRegularDate}
            />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return record.id ? (
                  <div>
                    <TooltipButton tooltip="Download" onClick={() => this.handleDownload(record)}>
                      <Icon type="download" theme="outlined" />
                    </TooltipButton>
                    <TooltipButton tooltip="Delete" onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </TooltipButton>
                  </div>
                ) : (
                  <TooltipButton tooltip="Upload" onClick={() => this.handleAdd(record)}>
                    <Icon type="upload" theme="outlined" />
                  </TooltipButton>
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
  documentList: state.documents.documentList,
  documentPagination: state.documents.documentPagination,
  isLoading: state.loading.effects.documents.getUserDocumentList,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  getDocumentList: dispatch.documents.getUserDocumentList,
  deleteDocument: dispatch.documents.deleteUserDocument,
  getDocumentDownloadLink: dispatch.documents.getDocumentDownloadLink,
  unmountDocumentList: dispatch.documents.unmountDocumentList,
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
