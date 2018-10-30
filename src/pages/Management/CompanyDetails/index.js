import React from 'react';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';
import { Button, Spin, Icon } from 'antd';
import EditCompanyDetails from './EditCompanyDetails';
import Header from '~components/Header';

import './CompanyDetails.scss';

export class CompanyDetails extends React.Component {
  static propTypes = {
    getCompany: PropTypes.func,
    company: PropTypes.object,
    isLoadingCompany: PropTypes.bool,
    isLoadingCategories: PropTypes.bool,
  };

  constructor(props, state) {
    super(props, state);
    this.state = {
      company: null,
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
    return null;
  }

  async componentDidMount() {
    const { getCompany, getCategories } = this.props;
    try {
      await getCompany();
    } catch (err) {
      await getCategories();
    }
  }

  handleAdd = () => {
    this.props.history.push(`/management/company-details/add`);
  };

  handleEdit = () => {
    this.props.history.push(`/management/company-details/edit`);
  };

  render() {
    const { isLoadingCompany, isLoadingCategories } = this.props;
    const { company } = this.state;
    return (
      <Box>
        <div className="CompanyDetails">
          <Spin
            size="large"
            className="CompanyDetails__spinner"
            spinning={isLoadingCompany || isLoadingCategories}>
            <Header title="Company Details" size="medium">
              {!isLoadingCompany &&
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
            {!isLoadingCompany &&
              !isLoadingCategories && <EditCompanyDetails disabled />}
          </Spin>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  company: state.tenantCompany.company,
  categories: state.tenantCompany.categories,
  isLoadingCompany: state.loading.effects.tenantCompany.getCompany,
  isLoadingCategories: state.loading.effects.tenantCompany.getCategories,
});

const mapDispatchToProps = dispatch => ({
  getCompany: dispatch.tenantCompany.getCompany,
  getCategories: dispatch.tenantCompany.getCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
