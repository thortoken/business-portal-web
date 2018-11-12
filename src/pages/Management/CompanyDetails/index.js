import React from 'react';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';
import { Button, Spin, Icon, Divider } from 'antd';
import EditCompanyDetails from './EditCompanyDetails';
import Header from '~components/Header';

import './CompanyDetails.scss';
import EditCompanyOwner from './EditCompanyOwner';
import StatusBlock from '../../../components/StatusBlock';

export class CompanyDetails extends React.Component {
  static propTypes = {
    getCompany: PropTypes.func,
    company: PropTypes.object,
    owner: PropTypes.object,
    isLoadingCompany: PropTypes.bool,
    isLoadingCategories: PropTypes.bool,
  };

  constructor(props, state) {
    super(props, state);
    this.state = {
      company: null,
      owner: null,
      categories: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.company !== prevState.company) {
      return {
        company: nextProps.company,
      };
    }
    if (nextProps.categories !== prevState.categories) {
      return {
        categories: nextProps.categories,
      };
    }
    if (nextProps.owner !== prevState.owner) {
      return {
        owner: nextProps.owner,
      };
    }
    return null;
  }

  async componentDidMount() {
    const { getCategories, getCompanyDetails } = this.props;
    try {
      await getCompanyDetails();
    } catch (err) {
      await getCategories();
    }
  }

  handleAdd = () => {
    const { isLoadingCompany, isLoadingCategories } = this.props;
    if (isLoadingCategories || isLoadingCompany) {
    } else {
      this.props.history.push(`/management/company-details/add`);
    }
  };

  handleEdit = () => {
    const { isLoadingCompany, isLoadingCategories } = this.props;
    if (isLoadingCategories || isLoadingCompany) {
    } else {
      this.props.history.push(`/management/company-details/edit`);
    }
  };

  render() {
    const { isLoadingCompanyDetails, isLoadingCategories } = this.props;
    const { company, owner } = this.state;
    return (
      <div className="CompanyDetails">
        <Header title="Company Details" size="medium">
          {company && company.status && <StatusBlock status={company.status} />}
          {!isLoadingCompanyDetails &&
            !isLoadingCategories && (
              <Button type="primary" onClick={company ? this.handleEdit : this.handleAdd}>
                {company ? (
                  <Icon type="form" theme="outlined" />
                ) : (
                  <Icon type="plus" theme="outlined" />
                )}
              </Button>
            )}
        </Header>
        <Spin
          size="small"
          className="CompanyDetails__spinner"
          spinning={isLoadingCompanyDetails || isLoadingCategories}>
          <Box className="CompanyDetails__box">
            {!isLoadingCompanyDetails &&
              !isLoadingCategories && (
                <div>
                  <Divider orientation="left">Company</Divider>
                  <EditCompanyDetails disabled />
                </div>
              )}
            {!isLoadingCompanyDetails &&
              !isLoadingCategories &&
              owner && (
                <div>
                  <Divider orientation="left">Owner</Divider>
                  <EditCompanyOwner disabled />
                </div>
              )}
          </Box>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.tenantCompany.company,
  categories: state.tenantCompany.categories,
  owner: state.tenantCompany.owner,
  isLoadingCompany: state.loading.effects.tenantCompany.getCompany,
  isLoadingCompanyDetails: state.loading.effects.tenantCompany.getCompanyDetails,
  isLoadingCategories: state.loading.effects.tenantCompany.getCategories,
});

const mapDispatchToProps = dispatch => ({
  getCompany: dispatch.tenantCompany.getCompany,
  getOwner: dispatch.tenantCompany.getOwner,
  getCategories: dispatch.tenantCompany.getCategories,
  getCompanyDetails: dispatch.tenantCompany.getCompanyDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
