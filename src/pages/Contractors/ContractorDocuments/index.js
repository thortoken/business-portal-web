import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'antd';
import Box from '../../../components/Box/index';
import makeDefaultPagination from '~utils/pagination';
import BackBtn from '~components/BackBtn';

import './ContractorDocuments.scss';

import Header from '~components/Header';
import RefreshButton from '~components/RefreshButton';
import StatusBlock from '../../../components/StatusBlock';

import { renderRegularDate } from '~utils/time';

const { Column } = Table;

class ContractorDocuments extends React.Component {
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

  handleGoBack = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}`);
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
      <div className="ContractorDocuments">
        <div className="ContractorDocuments__back">
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
            className="ContractorDocuments__table"
            rowKey="created"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="left"
              dataIndex="type"
              title="Type"
              render={text => {
                return <div className="ContractorDocuments__type">{text}</div>;
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
  userDocuments: state.users.userDocuments,
  userDocumentsPagination: state.users.userDocumentsPagination,
  isLoading: state.loading.effects.users.getUserDocuments,
});

const mapDispatchToProps = dispatch => ({
  getUserDocuments: dispatch.users.getUserDocuments,
  unmountUserDocuments: dispatch.users.unmountUserDocuments,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorDocuments);
