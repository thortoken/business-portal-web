import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './BackBtn.scss';

export class BackBtn extends React.Component {
  static propTypes = {
    goBack: PropTypes.func,
  };
  render() {
    return (
      <div className="BackBtn">
        <span onClick={this.handleBackBtn}>
          <Icon type="left" /> Back
        </span>
      </div>
    );
  }

  back() {
    const { history } = this.props;
    history.goBack();
  }

  handleBackBtn = () => {
    if (this.props.goBack) {
      this.props.goBack();
    } else {
      this.back();
    }
  };
}

export default BackBtn;
