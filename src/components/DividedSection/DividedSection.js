import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './DividedSection.scss';

const Cell = ({ children }) => <div className="DividedSection-cell">{children}</div>;

export class DividedSection extends React.Component {
  static Cell = Cell;

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  };

  static defaultProps = {
    orientation: 'horizontal',
  };

  render() {
    const { children, orientation } = this.props;

    return (
      <div className={classnames('DividedSection', { [`DividedSection--${orientation}`]: true })}>
        {children}
      </div>
    );
  }
}

export default DividedSection;
