import React from 'react';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';
import EditCompanyDetails from './EditCompanyDetails';
import AddCompanyDetails from './AddCompanyDetails';

import './CompanyDetails.scss';
import { Spin } from 'antd';

export class CompanyDetails extends React.Component {
  static propTypes = {
    getCompany: PropTypes.func,
    company: PropTypes.object,
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
    const { getCompany, getOwner, getCategories } = this.props;
    try {
      await getCompany();
    } catch (err) {
      await getCategories();
    }

    // await getOwner();
  }

  render() {
    const { company, categories } = this.state;
    return (
      <Box>
        <div className="CompanyDetails">
          {company && <EditCompanyDetails formValues={company} />}
          <Spin size="large" spinning={!company && categories.length === 0}>
            {!company && <AddCompanyDetails categories={categories} />}
          </Spin>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  company: state.tenantCompany.company,
  categories: state.tenantCompany.categories,
});

const mapDispatchToProps = dispatch => ({
  getCompany: dispatch.tenantCompany.getCompany,
  getOwner: dispatch.tenantCompany.getOwner,
  getCategories: dispatch.tenantCompany.getCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
