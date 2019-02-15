import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'antd';

import Box from '~components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';
import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import StatusBlock from '~components/StatusBlock';
import './CompanyDocuments.scss';

import { renderRegularDate } from '~utils/time';

const { Column } = Table;

class CompanyDocuments extends React.Component {
  static propTypes = {
    companyDocuments: PropTypes.arrayOf(PropTypes.object),
    companyDocumentsPagination: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  state = {
    companyDocuments: [],
    pagination: makeDefaultPagination(),
    companyDocumentsPagination: null,
  };

  componentDidMount() {
    const { pagination } = this.state;
    const { getCompanyDocuments } = this.props;
    getCompanyDocuments({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.companyDocuments !== prevState.companyDocuments) {
      return {
        companyDocuments: nextProps.companyDocuments,
      };
    }
    if (nextProps.companyDocumentsPagination !== prevState.companyDocumentsPagination) {
      let pag = prevState.pagination;
      return {
        companyDocumentsPagination: nextProps.companyDocumentsPagination,
        pagination: { ...pag, total: nextProps.companyDocumentsPagination.total },
      };
    }
    return null;
  }

  handleTableChange = pag => {
    const { getCompanyDocuments } = this.props;
    const { pagination } = this.state;
    let curr = pag.current;
    if (pagination.pageSize !== pag.pageSize) {
      curr = 1;
    }
    this.setState({ pagination: { ...pag, current: curr } });
    getCompanyDocuments({
      page: curr,
      limit: pag.pageSize,
    });
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push(`/management/company-details/documents/add`);
  };

  handleBack = () => {
    const { history } = this.props;
    history.push(`/management/company-details`);
  };

  handleRefresh = () => {
    const { getCompanyDocuments } = this.props;
    const { pagination } = this.state;
    getCompanyDocuments({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  render() {
    const { companyDocuments, pagination } = this.state;
    const { isLoading, history } = this.props;
    return (
      <div className="CompanyDocuments">
        <div className="CompanyDocuments__back">
          <BackBtn history={history} goBack={this.handleBack} />
        </div>
        <Header title="Documents List" size="medium">
          <Button type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </Button>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={companyDocuments}
            className="CompanyDocuments__table"
            rowKey="created"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="left"
              dataIndex="type"
              title="Type"
              render={text => {
                return <div className="CompanyDocuments__type">{text}</div>;
              }}
            />
            <Column align="center" dataIndex="created" title="Added" render={renderRegularDate} />
            <Column
              align="center"
              dataIndex="status"
              title="Status"
              render={text => {
                return (
                  <div>
                    <StatusBlock status={text} />
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
  companyDocuments: state.tenantCompany.companyDocuments,
  companyDocumentsPagination: state.tenantCompany.companyDocumentsPagination,
  isLoading: state.loading.effects.tenantCompany.getCompanyDocuments,
});

const mapDispatchToProps = dispatch => ({
  getCompanyDocuments: dispatch.tenantCompany.getCompanyDocuments,
  unmountCompanyDocuments: dispatch.tenantCompany.unmountCompanyDocuments,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDocuments);
