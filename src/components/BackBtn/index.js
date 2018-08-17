import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import './BackBtn.css';

class BackBtn extends React.Component {
  render() {
    const { to, label } = this.props;

    return (
      <div className="BackBtn">
        <Link to={to}>
          <Icon type="left" /> {label}
        </Link>
      </div>
    );
  }
}

BackBtn.defaultProps = {
  to: '/contractors',
  label: 'Contractors',
};

export default BackBtn;
