import React from 'react';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';
import EditCompanyDetails from './EditCompanyDetails';

import './CompanyDetails.scss';

export class CompanyDetails extends React.Component {
  static propTypes = {
    getCompany: PropTypes.func,
    company: PropTypes.object,
  };

  constructor(props, state) {
    super(props, state);
    this.state = {
      company: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.company !== prevState.company) {
      return {
        company: nextProps.company,
      };
    }
    return null;
  }

  async componentDidMount() {
    const { getCompany, getOwner } = this.props;
    await getCompany();
    // await getOwner();
  }

  render() {
    const { company } = this.state;
    return (
      <Box>
        <div className="CompanyDetails">
          {company && <EditCompanyDetails formValues={company} />}

        </div>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  company: state.tenantCompany.company,
});

const mapDispatchToProps = dispatch => ({
  getCompany: dispatch.tenantCompany.getCompany,
  getOwner: dispatch.tenantCompany.getOwner,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
