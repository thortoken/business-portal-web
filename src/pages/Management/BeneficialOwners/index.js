import React from 'react';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './BeneficialOwners.scss';
import { Button, Icon, Modal, Table } from 'antd';

import RefreshButton from '~components/RefreshButton';
import Header from '~components/Header';
import makeDefaultPagination from '~utils/pagination';

import NotificationService from '~services/notification';

const { Column } = Table;

export class BeneficialOwners extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    beneficialList: PropTypes.arrayOf(PropTypes.object),
    beneficialListPagination: PropTypes.object,
  };
  state = {
    beneficialList: [],
    pagination: makeDefaultPagination(),
    beneficialListPagination: null,
  };

  componentDidMount() {
    this.handleRefresh();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.beneficialList !== prevState.beneficialList) {
      return {
        beneficialList: nextProps.beneficialList,
      };
    }
    if (nextProps.beneficialListPagination !== prevState.beneficialListPagination) {
      let pag = prevState.pagination;
      return {
        beneficialListPagination: nextProps.beneficialListPagination,
        pagination: { ...pag, total: nextProps.beneficialListPagination.total },
      };
    }
    return null;
  }

  handleRefresh = () => {
    const { getBeneficialOwners } = this.props;
    const { pagination } = this.state;
    getBeneficialOwners({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  handleAdd = () => {
    const { isLoading } = this.props;
    if (isLoading) {
    } else {
      this.props.history.push(`/management/beneficial-owners/add`);
    }
  };

  handleEdit = row => {
    console.log('edit', row);
  };

  handleDelete = async row => {
    const { deleteBeneficialOwner } = this.props;
    const { id, firstName, lastName } = row;
    Modal.confirm({
      title: `Are you sure you want to delete ${firstName} ${lastName}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        await deleteBeneficialOwner(id);
        return this.handleRefresh();
      },
    });
  };

  render() {
    const { isLoading } = this.props;
    const { pagination, beneficialList } = this.state;
    return (
      <div className="BeneficialOwners">
        <Header title="Beneficial Owners List" size="medium">
          <Button type="primary" onClick={this.handleAdd}>
            <Icon type="plus" theme="outlined" />
          </Button>
          <RefreshButton handleRefresh={this.handleRefresh} isLoading={isLoading} />
        </Header>
        <Box>
          <Table
            dataSource={beneficialList}
            className="BeneficialOwners__table"
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column align="center" dataIndex="firstName" title="First Name" />
            <Column align="center" dataIndex="lastName" title="Last Name" />
            <Column align="center" dataIndex="address.city" title="City" />
            <Column align="center" dataIndex="address.stateProvinceRegion" title="State" />
            <Column align="center" dataIndex="verificationStatus" title="Status" />
            <Column
              align="center"
              title="Actions"
              render={(text, record) => {
                return (
                  <span className="BeneficialOwners__table__buttons">
                    <Button onClick={() => this.handleEdit(record)}>
                      <Icon type="form" theme="outlined" />
                    </Button>
                    <Button onClick={() => this.handleDelete(record)}>
                      <Icon type="delete" theme="outlined" />
                    </Button>
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
  beneficialList: state.beneficialOwners.beneficialList,
  beneficialListPagination: state.beneficialOwners.beneficialListPagination,
  isLoading: state.loading.effects.beneficialOwners.getBeneficialOwners,
});

const mapDispatchToProps = dispatch => ({
  getBeneficialOwners: dispatch.beneficialOwners.getBeneficialOwners,
  deleteBeneficialOwner: dispatch.beneficialOwners.deleteBeneficialOwner,
});

export default connect(mapStateToProps, mapDispatchToProps)(BeneficialOwners);
