import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './Integrations.scss';

export class Integrations extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="Integrations">Integrations</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(Integrations);
