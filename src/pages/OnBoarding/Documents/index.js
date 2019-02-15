import React from 'react';
import { connect } from 'react-redux';
import { Icon, Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import NotificationService from '~services/notification';
import TooltipButton from '~components/TooltipButton';
import RefreshButton from '~components/RefreshButton';
import DocumentTable from '~components/DocumentTable';
import AddDocumentModal from '~components/AddDocumentModal';
import Header from '~components/Header';
import makeDefaultPagination from '~utils/pagination';
import './Documents.scss';

export class Documents extends React.Component {
  static propTypes = {
    changeStep: PropTypes.func.isRequired,
    getDocuments: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    unmountDocumentList: PropTypes.func.isRequired,
    getDocumentDownloadLink: PropTypes.func.isRequired,
    documentList: PropTypes.arrayOf(PropTypes.object),
    documentPagination: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
  };

  state = {
    documentList: [],
    pagination: makeDefaultPagination(),
    documentPagination: null,
    isModelVisible: false,
    showNext: false,
    documentId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.documentList !== prevState.documentList) {
      // check for required documents
      let showNext = true;
      for (let index = 0; index < nextProps.documentList.length; index++) {
        const document = nextProps.documentList[index];
        if (document.isRequired && document.createdAt === null) {
          showNext = false;
          break;
        }
      }
      return {
        showNext,
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

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.props.unmountDocumentList();
  }

  handleTableChange = pag => {
    const { getDocuments } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getDocuments({
      page: curr,
      limit: pag.pageSize,
    });
  };

  handleRefresh = () => {
    const { getDocuments } = this.props;
    const { pagination } = this.state;
    getDocuments({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  handleAdd = row => {
    this.setState({ documentId: row.documentId, isModelVisible: true });
  };

  onChangeVisibility = (isModelVisible, refreshData = false) => {
    if (refreshData) {
      this.handleRefresh();
    }
    this.setState({ isModelVisible });
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
            description: `Can not delete: ${name}`,
          });
        }
        return this.handleRefresh();
      },
    });
  };

  handleDownload = async row => {
    const { getDocumentDownloadLink } = this.props;
    const { name, documentId } = row;
    try {
      const link = await getDocumentDownloadLink(documentId);
      window.open(link, '_blank');
    } catch (err) {
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: `Can not download: ${name}`,
      });
    }
  };

  render() {
    const { token, isLoading } = this.props;
    const { documentList, pagination, showNext, isModelVisible, documentId } = this.state;
    return (
      <div className="Documents">
        <AddDocumentModal
          endpoint={`contractors/documents/${documentId}`}
          token={token}
          isModalVisible={isModelVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={this.handleRefresh}
        />

        <Header size="medium">
          <RefreshButton handleRefresh={this.handleRefresh} />
        </Header>
        <DocumentTable
          handleTableChange={this.handleTableChange}
          documents={documentList}
          pagination={pagination}
          isLoading={isLoading}
          renderActions={this.renderActions}
        />
        <div>
          Please download, fill out and upload your W-9 document and contact your employer for
          information on additional required documentation.
          <a
            href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
            target="_blank"
            rel="noopener noreferrer">
            {' Click here to Download W-9'}
          </a>
        </div>
        <div className="Profile__button-container">
          <Button
            disabled={!showNext}
            size="large"
            type="primary"
            onClick={this.handleChangeStep}
            className="Profile__button-container--button">
            Next
          </Button>
        </div>
      </div>
    );
  }

  renderActions = (_text, record) => {
    return record.id ? (
      <div>
        <TooltipButton tooltip="Delete" onClick={() => this.handleDelete(record)}>
          <Icon type="delete" theme="outlined" />
        </TooltipButton>
      </div>
    ) : (
      <div>
        <TooltipButton tooltip="Download a copy" onClick={() => this.handleDownload(record)}>
          <Icon type="copy" theme="outlined" />
        </TooltipButton>
        <TooltipButton tooltip="Upload your document" onClick={() => this.handleAdd(record)}>
          <Icon type="upload" theme="outlined" />
        </TooltipButton>
      </div>
    );
  };

  handleChangeStep = () => {
    this.props.changeStep(3);
  };
}

const mapStateToProps = state => ({
  token: state.auth.token,
  documentList: state.documents.documentList,
  documentPagination: state.documents.documentPagination,
  isLoading: state.loading.effects.documents.getContractorDocumentList,
});

const mapDispatchToProps = dispatch => ({
  changeStep: dispatch.onBoarding.changeStep,
  getDocuments: dispatch.documents.getContractorDocumentList,
  deleteDocument: dispatch.documents.deleteContractorDocument,
  unmountDocumentList: dispatch.documents.unmountDocumentList,
  getDocumentDownloadLink: dispatch.documents.getDocumentDownloadLink,
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
