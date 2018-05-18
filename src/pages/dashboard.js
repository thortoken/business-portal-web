import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { syncPayments } from '../redux/actions/dashboard';

import '../css/dashboard.css';

class Dashboard extends React.Component {
  state = {
    message: 'World',
  };

  componentDidMount() {
    console.log('Dashboard mounted');
    this.props.syncPayments();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="header">Dashboard</div>
        <ul>{this.props.payments.map(payment => <li key={payment.id}>{payment.amount}</li>)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payments: state.dashboard.payments,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncPayments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
