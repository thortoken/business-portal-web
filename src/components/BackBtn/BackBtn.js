import React from 'react';
import { Icon } from 'antd';

import './BackBtn.scss';

export class BackBtn extends React.Component {
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
    this.back();
  };
}

export default BackBtn;
