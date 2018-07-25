import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu';
import ManageAccount from './ManageAccount';
import { Balance } from './Balance';
import {
  changeRenewState,
  getRenewState,
  getBalance,
  getPaymentDaysLeft,
} from '~redux/actions/topbar';

import './Topbar.css';

const Logo = ({ children }) => <div className="Topbar-logo">{children}</div>;

class Topbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isAutoRenewOn: PropTypes.bool,
    balanceValue: PropTypes.number,
    getRenewState: PropTypes.func,
    getBalance: PropTypes.func,
    paymentDaysLeft: PropTypes.number,
  };

  componentDidMount() {
    this.props.getRenewState();
    this.props.getBalance();
    this.props.getPaymentDaysLeft();
  }

  render() {
    const { className, isAutoRenewOn, balanceValue, paymentDaysLeft } = this.props;

    return (
      <div className={classNames('Topbar', className)}>
        <div className="Topbar-left">
          <Logo>
            <img className="Topbar-logo-image" src="images/yoshi_logo.png" />
          </Logo>
        </div>
        <div className="Topbar-center">
          <Menu />
          <Balance
            paymentDaysLeft={paymentDaysLeft}
            balanceValue={balanceValue}
            isAutoRenewOn={isAutoRenewOn}
            onChange={this.handleChange}
          />
        </div>
        <div className="Topbar-right">
          <ManageAccount />
        </div>
      </div>
    );
  }

  handleChange = checked => {
    this.props.changeRenewState(checked);
  };
}

const mapStateToProps = state => ({
  isAutoRenewOn: state.topbar.isAutoRenewOn,
  balanceValue: state.topbar.balanceValue,
  paymentDaysLeft: state.topbar.paymentDaysLeft,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeRenewState, getRenewState, getBalance, getPaymentDaysLeft }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
