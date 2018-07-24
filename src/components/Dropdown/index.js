import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown as AntDropdown, Menu } from 'antd';

import './Dropdown.css';

export class Dropdown extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onClick: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
        PropTypes.string,
      ])
    ),
  };

  static defaultProps = {
    options: [],
  };

  render() {
    const { className, children, options, onClick, ...dropdownProps } = this.props;

    const menu = this.renderMenu();
    return (
      <div className={classNames('Dropdown', className)}>
        <AntDropdown overlay={menu} trigger={['click']} {...dropdownProps}>
          {children}
        </AntDropdown>
      </div>
    );
  }

  renderMenu = () => {
    const { options } = this.props;

    return (
      <Menu onClick={this.handleSelect}>
        {options.map(option => {
          const value = option.value || option;
          const key = option.key || value;

          return <Menu.Item key={key}>{value}</Menu.Item>;
        })}
      </Menu>
    );
  };

  handleSelect = event => {
    this.props.onClick(event.key);
  };
}

export default Dropdown;
