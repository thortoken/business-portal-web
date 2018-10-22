import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './CompanyTeam.scss';

export class CompanyTeam extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="CompanyTeam">CompanyTeam</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(CompanyTeam);
