import React from 'react';
import { Steps, Icon, Spin, Button } from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import BankInfo from './BankInfo';
import CompanyDetails from './CompanyDetails';
import BeneficialOwners from './BeneficialOwners';
import Done from './Done';
import './Welcome.scss';

const Step = Steps.Step;

export class Welcome extends React.Component {
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
      history.push('/payments');
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
        title: 'Company Details',
        icon: 'home',
        content: () => <CompanyDetails />,
      },
      {
        title: 'Beneficial Owners',
        icon: 'crown',
        content: () => <BeneficialOwners />,
      },
      {
        title: 'Bank Info',
        icon: 'bank',
        content: () => <BankInfo />,
      },
      {
        title: 'Done',
        icon: 'smile-o',
        content: () => <Done />,
      },
    ];
    return (
      <div className="Welcome">
        <div className="Welcome__topbar">
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
        <div className="Welcome__container">
          <div className="Welcome__steps">
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

          <div className="Welcome__steps--content">
            {!ready && <Spin size="large" className="Welcome__steps--spin" />}
            {ready && steps[step].content()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  step: state.welcome.step,
  ready: state.welcome.ready,
});

const mapDispatchToProps = dispatch => ({
  checkStep: dispatch.welcome.checkStep,
  logout: dispatch.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
