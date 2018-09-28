import React from 'react';
import { Icon } from 'antd';

import './BackBtn.css';

class BackBtn extends React.Component {
  render() {
    return (
      <div className="BackBtn">
        <a onClick={this.handleBackBtn}>
          <Icon type="left" /> Back
        </a>
      </div>
    );
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.goBack();
  };
}

export default BackBtn;
