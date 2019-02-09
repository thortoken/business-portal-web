import React from 'react';
import { Steps, Icon, Spin, Button } from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Profile from './Profile';
import Terms from './Terms';
import BankInfo from './BankInfo';
import Done from './Done';
import Documents from './Documents';
import './OnBoarding.scss';

const Step = Steps.Step;

export class OnBoarding extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    ready: PropTypes.bool,
  };

  state = {
    step: 0,
    ready: false,
  };

  async componentDidMount() {
    const { checkStep, history } = this.props;

    const redirect = await checkStep();
    if (redirect) {
      history.push('/contractor');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let localState = {};
    if (nextProps.step !== prevState.step) {
      localState['step'] = nextProps.step;
    }
    if (nextProps.ready !== prevState.ready) {
      localState['ready'] = nextProps.ready;
    }
    return Object.keys(localState).length ? localState : null;
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { step, ready } = this.state;

    const steps = [
      {
        title: 'Terms',
        icon: 'solution',
        content: () => <Terms />,
      },
      {
        title: 'Profile',
        icon: 'user',
        content: () => <Profile />,
      },
      {
        title: 'Documents',
        icon: 'file',
        content: () => <Documents />,
      },
      {
        title: 'Bank Info',
        icon: 'dollar',
        content: () => <BankInfo />,
      },
      {
        title: 'Done',
        icon: 'smile-o',
        content: () => <Done />,
      },
    ];
    return (
      <div className="OnBoarding">
        <div className="OnBoarding__topbar">
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
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
  step: state.onBoarding.step,
  ready: state.onBoarding.ready,
});

const mapDispatchToProps = dispatch => ({
  checkStep: dispatch.onBoarding.checkStep,
  logout: dispatch.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
