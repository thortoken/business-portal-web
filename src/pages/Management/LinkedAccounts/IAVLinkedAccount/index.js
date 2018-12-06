import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dwolla from '~components/Dwolla';
import { Spin } from 'antd';

import NotificationService from '~services/notification';

import './IAVLinkedAccount.scss';
import Config from '~services/config';

export class IAVLinkedAccount extends React.Component {
  static propTypes = {
    createIAVFundingSource: PropTypes.func.isRequired,
  };
  state = {
    iavToken: '',
    dwollaConfig: {
      backButton: false,
      customerToken: null,
      environment: Config.env === 'dev' ? 'sandbox' : 'prod',
      fallbackToMicroDeposits: true,
      microDeposits: true,
      stylesheets: [],
      subscriber: () => {},
    },
  };

  constructor(props) {
    super(props);
    props.getIavToken({ type: 'tenants' });
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
      console.log('err', err);
      NotificationService.open({
        type: 'error',
        message: 'Error',
        description: err,
      });
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
    history.goBack();
  };

  createFundingSource = async ({ uri }) => {
    const { createIAVFundingSource } = this.props;

    await createIAVFundingSource({ uri });
  };
}

const mapStateToProps = state => ({
  iavToken: state.iav.iavToken,
  isLoading: state.loading.effects.tenants.createIAVFundingSource,
  iavIsLoading: state.loading.effects.iav.getIavToken,
});

const mapDispatchToProps = dispatch => ({
  createIAVFundingSource: dispatch.tenants.createIAVFundingSource,
  getIavToken: dispatch.iav.getIavToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(IAVLinkedAccount);
