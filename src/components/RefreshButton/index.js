import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';

import './RefreshButton.css';

class RefreshButton extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    type: 'primary',
    isLoading: false,
    size: 'default',
  };
  render() {
    const { handleRefresh, isLoading, type, size } = this.props;

    return (
      <Button type={type} size={size} onClick={handleRefresh} className="Refresh-button">
        <Icon type="sync" theme="outlined" spin={isLoading} />
      </Button>
    );
  }
}

export default RefreshButton;
