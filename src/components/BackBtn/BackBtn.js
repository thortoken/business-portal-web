import React from 'react';
import { Icon } from 'antd';

import './BackBtn.css';

export class BackBtn extends React.Component {
  render() {
    return (
      <div className="BackBtn">
        <a onClick={this.handleBackBtn}>
          <Icon type="left" /> Back
        </a>
      </div>
    );
  }

  back() {
    const { history } = this.props;
    history.goBack();
  }

  handleBackBtn = () => {
    this.back();
  };
}

export default BackBtn;
