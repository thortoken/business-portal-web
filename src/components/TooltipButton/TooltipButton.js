import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';

import './TooltipButton.scss';

export class TooltipButton extends React.Component {
  static propTypes = {
    tooltip: PropTypes.string,
    placement: PropTypes.string,
  };

  static defaultProps = {
    placement: 'top',
  };

  render() {
    const { tooltip, placement } = this.props;

    return (
      <Tooltip title={tooltip} placement={placement}>
        <Button {...this.props} className="Tooltip-button">
          {this.props.children}
        </Button>
      </Tooltip>
    );
  }
}

export default TooltipButton;
