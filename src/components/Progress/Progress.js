import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Progress as AntProgress } from 'antd';

import './Progress.scss';

export class Progress extends React.Component {
  static propTypes = {
    percent: PropTypes.number,
  };

  static defaultProps = {
    percent: 0,
  };

  render() {
    const { percent, ...progressProps } = this.props;
    return (
      <div className={classnames('Progress', { 'Progress--success': percent === 100 })}>
        <AntProgress {...progressProps} showInfo={false} percent={percent} />
        <div className="Progress-text" style={{ left: `${percent / 2}%` }}>
          {percent} %
        </div>
      </div>
    );
  }
}

export default Progress;
