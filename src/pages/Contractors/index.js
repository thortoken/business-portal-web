import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTransactions, pauseTransactions } from '~redux/actions/transactions';

import Filters from './components/Filters';

import './Contractors.css';

class Contractors extends React.Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    pauseTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    // this.props.getTransactions();
  }

  componentWillUnmount() {
    this.props.pauseTransactions();
  }

  render() {
    return (
      <div>
        <Filters />
        <h1>contractors</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactions,
      pauseTransactions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contractors);
