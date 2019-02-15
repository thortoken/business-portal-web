import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dwolla from '~components/Dwolla';
import { Spin } from 'antd';

import NotificationService from '~services/notification';
import Config from '~services/config';
import './IAVLinkedAccount.scss';

export class IAVLinkedAccount extends React.Component {
  static propTypes = {
    createFundingSourceWithIAV: PropTypes.func.isRequired,
    getIavToken: PropTypes.func.isRequired,
    iavToken: PropTypes.string,
    iavIsLoading: PropTypes.bool,
    isLoading: PropTypes.bool,
  };
  state = {
    dwollaConfig: {
      backButton: false,
      customerToken: null,
      environment: Config.env === 'dev' ? 'sandbox' : 'prod',
      fallbackToMicroDeposits: false,
      microDeposits: false,
      stylesheets: [],
      subscriber: () => {},
    },
  };

  componentDidMount() {
    const { getIavToken } = this.props;
    getIavToken({ type: 'tenants' });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};
    if (nextProps.iavToken !== null) {
      localState['dwollaConfig'] = { ...prevState.dwollaConfig, customerToken: nextProps.iavToken };
    }
    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const { dwollaConfig } = this.state;
    const { iavIsLoading } = this.props;

    const onError = err => {
      if (!err.toString().search('dwolla-iav-container')) {
        NotificationService.open({
          type: 'error',
          message: 'Error',
          description: err.toString(),
        });
      }
    };
    return (
      <div className="IAVLinkedAccount">
        <div className="IAVLinkedAccount__form">
          <Spin spinning={iavIsLoading || !dwollaConfig.customerToken}>
            {!iavIsLoading &&
              dwollaConfig.customerToken && (
                <div>
                  <div className="IAVLinkedAccount__warning">Please do not hit refresh.</div>
                  <Dwolla
                    onSuccess={this.handleIAVSuccess}
                    onError={onError}
                    dwollaConfig={dwollaConfig}
                  />
                </div>
              )}
          </Spin>
        </div>
      </div>
    );
  }

  handleIAVSuccess = async uri => {
    await this.createFundingSource({ uri });
    this.handleSubmitSuccess();
  };

  handleSubmitSuccess = () => {
    const { history } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Funding Source successfully added.',
    });
    history.replace('/management/linked-accounts');
  };

  createFundingSource = async ({ uri }) => {
    const { createFundingSourceWithIAV } = this.props;
    await createFundingSourceWithIAV({ uri });
  };
}

const mapStateToProps = state => ({
  iavToken: state.fundingSources.iavToken,
  isLoading: state.loading.effects.fundingSources.createTenantFundingSourceWithIAV,
  iavIsLoading: state.loading.effects.fundingSources.getIavToken,
});

const mapDispatchToProps = dispatch => ({
  createFundingSourceWithIAV: dispatch.fundingSources.createTenantFundingSourceWithIAV,
  getIavToken: dispatch.fundingSources.getIavToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(IAVLinkedAccount);
