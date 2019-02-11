import React from 'react';
import { connect } from 'react-redux';
import { Icon, Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import NotificationService from '~services/notification';
import TooltipButton from '~components/TooltipButton';
import DocumentTable from '~components/DocumentTable';
import AddDocumentModal from './components/AddDocumentModal';
import Header from '~components/Header';
import makeDefaultPagination from '~utils/pagination';
import './Documents.scss';

export class Documents extends React.Component {
  static propTypes = {
    documentsList: PropTypes.arrayOf(PropTypes.object),
    documentsListPagination: PropTypes.object,
    isLoading: PropTypes.bool,
    token: PropTypes.string.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    getDocumentList: PropTypes.func.isRequired,
    changeStep: PropTypes.func.isRequired,
  };

  state = {
    documentsList: [],
    pagination: makeDefaultPagination(),
    documentsListPagination: null,
    isAddDocumentModelVisible: false,
    showNext: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    const { getDocumentList } = this.props;
    getDocumentList({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.documentsList !== prevState.documentsList) {
      // check if a w9 is in the document list
      let showNext = false;
      for (let index = 0; index < nextProps.documentsList.length; index++) {
        const document = nextProps.documentsList[index];
        if (document.type === 'w9') {
          showNext = true;
          break;
        }
      }
      return {
        showNext,
        documentsList: nextProps.documentsList,
      };
    }
    if (nextProps.documentsListPagination !== prevState.documentsListPagination) {
      let pag = prevState.pagination;
      return {
        documentsListPagination: nextProps.documentsListPagination,
        pagination: { ...pag, total: nextProps.documentsListPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getDocumentList } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getDocumentList({
      page: curr,
      limit: pag.pageSize,
    });
  };

  handleAddDocumentClick = () => {
    this.setState({ isAddDocumentModalVisible: true });
  };

  onChangeVisibility = (isAddDocumentModalVisible, refreshData = false) => {
    if (refreshData) {
      this.handleRefresh();
    }
    this.setState({ isAddDocumentModalVisible });
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

  handleRefresh = () => {
    const { getDocumentList } = this.props;
    const { pagination } = this.state;
    getDocumentList({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  render() {
    const { token, isLoading } = this.props;
    const { documentsList, pagination, showNext, isAddDocumentModalVisible } = this.state;
    return (
      <div className="Documents">
        <AddDocumentModal
          token={token}
          isModalVisible={isAddDocumentModalVisible}
          onChangeVisibility={this.onChangeVisibility}
          handleRefresh={this.handleRefresh}
        />

        <Header size="medium">
          <TooltipButton
            tooltip="Add document"
            type="primary"
            onClick={this.handleAddDocumentClick}>
            Add Document
            <Icon type="plus" theme="outlined" />
          </TooltipButton>
        </Header>
        <DocumentTable
          handleTableChange={this.handleTableChange}
          documents={documentsList}
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

  renderActions = (text, record) => {
    return (
      <div>
        <TooltipButton tooltip="Delete" onClick={() => this.handleDelete(record)}>
          <Icon type="delete" theme="outlined" />
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
  documentList: state.documents.contractorDocumentList,
  documentPagination: state.documents.contractorDocumentPagination,
  isLoading: state.loading.effects.documents.getContractorDocumentList,
});

const mapDispatchToProps = dispatch => ({
  changeStep: dispatch.onBoarding.changeStep,
  getDocumentList: dispatch.documents.getContractorDocumentList,
  deleteDocument: dispatch.documents.deleteContractorDocument,
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
