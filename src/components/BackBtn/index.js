import React from 'react';
import PropTypes from 'prop-types';
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

BackBtn.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default BackBtn;
