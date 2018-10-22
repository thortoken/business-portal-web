import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './LinkedAccounts.scss';

export class LinkedAccounts extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="LinkedAccounts">LinkedAccounts</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(LinkedAccounts);
