import React from 'react';

import { Steps, Icon, Spin } from 'antd';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import SignUp from './SignUp';
import Bank from './Bank';
import Terms from './Terms';
import NotificationService from '~services/notification';

import './OnBoarding.scss';

const Step = Steps.Step;

export class OnBoarding extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        invitationId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    contractor: PropTypes.object,
    agreement: PropTypes.bool,
    step: PropTypes.number,
    ready: PropTypes.bool,
  };

  state = {
    contractor: null,
    agreement: false,
  };

  async componentDidMount() {
    const { checkStep, match, history } = this.props;
    let redirect = false;
    if (match.params.invitationId === 'bank') {
      redirect = await checkStep({ invitationToken: '' });
    } else {
      redirect = await checkStep({ invitationToken: match.params.invitationId });
    }
    if (redirect) {
      history.push('/sign-in');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};
    if (nextProps.contractor !== prevState.contractor) {
      localState['contractor'] = nextProps.contractor;
    }
    if (nextProps.agreement !== prevState.agreement) {
      localState['agreement'] = nextProps.agreement;
    }
    if (nextProps.ready !== prevState.ready) {
      localState['ready'] = nextProps.ready;
    }
    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const { step, match, ready } = this.props;

    const steps = [
      {
        title: 'Terms',
        icon: 'solution',
        content: () => <Terms />,
      },
      {
        title: 'Sign Up',
        icon: 'user',
        content: () => <SignUp invToken={match.params.invitationId} />,
      },
      {
        title: 'Bank Account',
        icon: 'dollar',
        content: () => <Bank />,
      },
      {
        title: 'Done',
        icon: 'smile-o',
        content: () => <Terms />,
      },
    ];
    return (
      <div className="OnBoarding">
        <div className="OnBoarding__container">
          <div className="OnBoarding__steps">
            <Steps current={step}>
              {steps.map(item => (
                <Step
                  key={item.title}
                  title={item.title}
                  icon={<Icon type={item.icon} theme="outlined" />}
                />
              ))}
            </Steps>
          </div>

          <div className="OnBoarding__steps--content">
            {!ready && <Spin size="large" className="OnBoarding__steps--spin" />}
            {ready && steps[step].content()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  step: state.onBoarding.step,
  agreement: state.onBoarding.agreement,
  ready: state.onBoarding.ready,
  isLoading: state.loading.effects.onBoarding.checkInvitation,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  checkInvitation: dispatch.onBoarding.checkInvitation,
  getAgreement: dispatch.onBoarding.getAgreement,
  changeStep: dispatch.onBoarding.changeStep,
  checkStep: dispatch.onBoarding.checkStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
