import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './Settings.scss';

export class Settings extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="Settings">Settings</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(Settings);
