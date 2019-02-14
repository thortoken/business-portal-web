import React from 'react';
import { Icon, Modal, Table, Tooltip, Switch } from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import NotificationService from '~services/notification';
import Box from '~components/Box';
import TooltipButton from '~components/TooltipButton';
import RefreshButton from '~components/RefreshButton';
import Header from '~components/Header';
import makeDefaultPagination from '~utils/pagination';
import AddDocumentModal from './components/AddDocumentModal';
import { renderRegularDate } from '~utils/time';
import './DocumentList.scss';

const { Column } = Table;

export class DocumentList extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    statusIsLoading: PropTypes.bool,
    documentList: PropTypes.arrayOf(PropTypes.object),
    documentPagination: PropTypes.object,
  };
  state = {
    documentList: [],
    pagination: makeDefaultPagination(),
    documentPagination: null,
    isAddDocumentModalVisible: false,
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

  handleTableChange = (pag, filters, sorters) => {
    const { pagination } = this.state;
    let curr = pag.current;

    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }

    this.setState({ pagination: { ...pag, current: curr }, filters, sorters });
    this.updateTable({
      current: curr,
      limit: pag.pageSize,
    });
  };

  handleRefresh = () => {
    const { pagination } = this.state;
    this.updateTable({
      current: pagination.current,
      limit: pagination.pageSize,
    });
  };

  updateTable(config) {
    const { getDocumentList } = this.props;
    getDocumentList({
      page: config.current,
      limit: config.limit,
    });
  }

  handleToggleIsRequired = async row => {
    const { changeJobStatus } = this.props;
    try {
      await changeJobStatus(row);
      NotificationService.open({
        type: 'success',
        message: 'Success',
        description: `Job: ${row.name} status successfully changed.`,
      });
      await this.handleRefresh();
    } catch (err) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: err.toString(),
      });
    }
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
        description: `Cannot download: ${name}`,
      });
    }
  };

  handleDelete = async row => {
    const { deleteDocument } = this.props;
    const { name, id } = row;
    Modal.confirm({
      title: `Are you sure you want to delete ${name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteDocument(id);
          NotificationService.open({
            type: 'success',
            message: 'Success',
            description: `${name} successfully deleted`,
          });
        } catch (err) {
          NotificationService.open({
            type: 'error',
            message: 'Error',
            description: `Cannot delete: ${name}`,
          });
        }
        return this.handleRefresh();
      },
    });
  };

  handleAdd = () => {
    this.setState({ isAddDocumentModalVisible: true });
  };

  onChangeVisibility = (isAddDocumentModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleRefresh();
    }
    this.setState({ isAddDocumentModalVisible });
  };

  render() {
    const { isLoading, token } = this.props;
    const { pagination, documentList, isAddDocumentModalVisible } = this.state;
    const title = `${documentList.length} ${
      documentList.length === 1 ? 'Document' : 'DocumentList'
    }`;
    return (
      <div className="DocumentList">
        <AddDocumentModal
          token={token}
          isModalVisible={isAddDocumentModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={this.handleRefresh}
        />
        <Header title={title} size="medium">
          <TooltipButton tooltip="Add document" type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </TooltipButton>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={documentList}
            className="DocumentList__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="center"
              dataIndex="name"
              title="Name"
              render={(text, record) => {
                return (
                  <Tooltip title={record.description}>
                    <div className="DocumentList__name">{text}</div>
                  </Tooltip>
                );
              }}
            />
            <Column
              align="center"
              dataIndex="isRequired"
              title="Required"
              render={(text, record) => {
                return (
                  <span>
                    <Switch
                      checked={record.isRequired}
                      onChange={() => this.handleToggleIsRequired(record)}
                      checkedChildren="Required"
                      unCheckedChildren="Required"
                    />
                  </span>
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
                return (
                  <span className="DocumentList__table__buttons">
                    <TooltipButton tooltip="Download" onClick={() => this.handleDownload(record)}>
                      <Icon type="download" theme="outlined" />
                    </TooltipButton>
                    <TooltipButton tooltip="Delete" onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </TooltipButton>
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
  documentList: state.documents.documentList,
  documentPagination: state.documents.documentPagination,
  isLoading: state.loading.effects.documents.getDocumentList,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  getDocumentList: dispatch.documents.getDocumentList,
  deleteDocument: dispatch.documents.deleteDocument,
  getDocumentDownloadLink: dispatch.documents.getDocumentDownloadLink,
  unmountDocumentList: dispatch.documents.unmountDocumentList,
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
