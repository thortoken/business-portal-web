import React from 'react';

import { Steps, Icon } from 'antd';

import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Terms from './Terms';

import './OnBoarding.css';
import SignUp from './SignUp';
import NotificationService from '~services/notification';

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
  };

  state = {
    ready: false,
    contractor: null,
    agreement: false,
  };

  async componentDidMount() {
    const { checkInvitation, getAgreement, match, history } = this.props;
    const invitation = await checkInvitation(match.params.invitationId);
    if (invitation.status === 200) {
      await getAgreement();
    } else if (invitation.status === 406) {
      history.push('/sign-in');
      NotificationService.open({
        type: 'warning',
        message: 'Warning',
        description: `${invitation.data.error}. Sign in with your credentials.`,
      });
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
    return Object.keys(localState).length ? localState : null;
  }

  render() {
    const { step, match } = this.props;
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
        title: 'Funding Source',
        icon: 'dollar',
        content: () => <Terms />,
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
          <div className="OnBoarding__steps--content">{steps[step].content()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contractor: state.onBoarding.contractor,
  step: state.onBoarding.step,
  agreement: state.onBoarding.agreement,
  isLoading: state.loading.effects.onBoarding.checkInvitation,
});

const mapDispatchToProps = dispatch => ({
  checkInvitation: dispatch.onBoarding.checkInvitation,
  getAgreement: dispatch.onBoarding.getAgreement,
});

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
