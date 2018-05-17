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
    // this.props.fetchPayments();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="header">Dashboard</div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   payments: state.dashboard.payments,
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       fetchPayments,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard;
