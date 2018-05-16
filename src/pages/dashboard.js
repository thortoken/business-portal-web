import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../css/dashboard.css';

class Dashboard extends React.Component {
  state = {
    message: 'World',
  };

  componentDidMount() {}

  render() {
    return <div className="dashboard">Hello {this.state.message}</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
