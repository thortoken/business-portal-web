import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPayments } from '../redux/actions/dashboard';

import '../css/dashboard.css';

class Dashboard extends React.Component {
  state = {
    message: 'World',
  };

  componentDidMount() {
    this.props.fetchPayments();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="header">Dashboard</div>

        {/* <p>Payments: {JSON.stringify(this.props.payments)}</p> */}
        <ul>{this.props.payments.map(p => <li key={p.id}>{p.amount}</li>)}</ul>
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
      fetchPayments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
