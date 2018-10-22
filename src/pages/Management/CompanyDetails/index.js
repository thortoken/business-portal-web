import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './CompanyDetails.scss';

export class CompanyDetails extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="CompanyDetails">CompanyDetails</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(CompanyDetails);
