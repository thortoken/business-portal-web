import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Icon, Divider } from 'antd';
import PropTypes from 'prop-types';

import TooltipButton from '~components/TooltipButton';
import Box from '~components/Box';
import Header from '~components/Header';
import './Billing.scss';

export class Billing extends React.Component {
  static propTypes = {
    getFundingSources: PropTypes.func.isRequired,
    unmountFundingSources: PropTypes.func.isRequired,
    fundingSourceList: PropTypes.arrayOf(PropTypes.object),
    settings: PropTypes.object,
  };
  state = {
    fundingSourceList: [],
    settings: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tenant.settings !== prevState.settings) {
      return {
        settings: nextProps.tenant.settings,
      };
    }
    if (nextProps.fundingSourceList !== prevState.fundingSourceList) {
      return {
        fundingSourceList: nextProps.fundingSourceList,
      };
    }

    return null;
  }

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    // this.props.unmountFundingSources();
  }

  handleRefresh = () => {
    const { getFundingSources } = this.props;
    getFundingSources();
  };

  handleConnectBankAccount = () => {
    this.props.history.push('/management/linked-accounts/add');
  };

  handleEditBankAccount = () => {
    this.props.history.push('/management/linked-accounts');
  };

  render() {
    const { fundingSourceList, settings } = this.state;
    const pricePerContractor = settings && settings.billing && settings.billing.pricePerContractor;

    return (
      <div className="Billing">
        <Header title="Billing" size="medium">
          {fundingSourceList.length === 0 ? (
            <TooltipButton
              tooltip="Add bank info"
              type="primary"
              onClick={this.handleConnectBankAccount}>
              <Icon type="bank" theme="outlined" />
              Connect Bank Account
            </TooltipButton>
          ) : (
            <TooltipButton
              tooltip="Edit bank info"
              type="primary"
              onClick={this.handleEditBankAccount}>
              <Icon type="bank" theme="outlined" />
              {fundingSourceList.length > 0 && fundingSourceList[0].name}
            </TooltipButton>
          )}
        </Header>
        <Box>
          <div className="row">
            <div className="column">
              <div className="title" />
              <Divider style={{ backgroundColor: 'white' }} />
              <div className="content" />
              <div className="title">Payments</div>
              <Divider />
              <div className="content">
                Reduce your payment costs to $0 with Odin! No more paying 2.9% per transaction plus
                hidden fees and up front costs. Pay your contractors with the click of a button. It
                has never been so easy-and so affordable.
              </div>
              <div className="title">Onboard</div>
              <Divider />
              <div className="content">
                With Odin's free onboarding, we do all of the heavy lifting to get your contractors
                into the system, and it costs you nothing! You can onboard new and existing
                contractors with no hassle and for no cost.
              </div>
              <div className="title">Managment & Retention</div>
              <Divider />
              <div className="content">
                We will manange and retain your entire contractor workforce! This includes storing
                relevant employment docs, tracking all outbound payments, and automatically
                reporting all relevant information to the IRS. No more spreadsheets. No more filing
                cabinets.
              </div>
              <div className="cell">*exact pricing subject to change</div>
            </div>

            {/*
            <div className="thor_column">
              <div className="header title center">
                <span>
                  <img className="image" src="images/Thor_logo-small.png" alt="" />
                  pay with Thor
                </span>
              </div>
              <Divider />
              <div className="content title center">Coming Soon</div>
              <div className="title">0%</div>
              <Divider />
              <div className="content" />
              <div className="title">FREE</div>
              <Divider />
              <div className="content" />
              <div className="title">20 Thor / month</div>
              <Divider />
              <div className="content">per contractor</div>
              <div className="cell" />
            </div>
            */}

            <div className="usd_column">
              <div className="header title center">$ pay with USD</div>
              <Divider />
              <div className="content title center">
                <Icon type="check" className="Billing__check" />
              </div>
              <div className="title">0%*</div>
              <Divider />
              <div className="content" />
              <div className="title">FREE</div>
              <Divider />
              <div className="content" />
              <div className="title">${pricePerContractor} / month</div>
              <Divider />
              <div className="content">per contractor</div>
              <div className="cell" />
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fundingSourceList: state.fundingSources.fundingSourceList,
  tenant: state.tenants.tenant,
});

const mapDispatchToProps = dispatch => ({
  getFundingSources: dispatch.fundingSources.getTenantFundingSources,
  unmountFundingSources: dispatch.fundingSources.unmountFundingSources,
});

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
