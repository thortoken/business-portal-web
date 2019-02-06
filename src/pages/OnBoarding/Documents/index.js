import React from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import PropTypes from 'prop-types';

import AddDocument from './components/AddDocument';
import './Documents.scss';

const Step = Steps.Step;

export class Documents extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    changeStep: PropTypes.func.isRequired,
  };

  state = {
    step: 0,
  };

  handleChangeStep = () => {
    const { step } = this.state;
    if (step === 2) {
      this.props.changeStep(3);
    } else {
      this.setState({ step: step + 1 });
    }
  };

  render() {
    const { step } = this.state;
    const { token } = this.props;
    const steps = [
      {
        title: 'W-9',
        icon: 'solution',
        type: 'w9',
      },
      {
        title: `Driver's License`,
        icon: 'user',
        type: 'license',
      },
      {
        title: 'Passport',
        icon: 'file',
        type: 'passport',
      },
    ];
    return (
      <div className="Documents">
        <div className="Documents__steps">
          <Steps current={step}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </div>

        <div className="Documents__steps--content">
          {<AddDocument token={token} changeStep={this.handleChangeStep} type={steps[step].type} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
