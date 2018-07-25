import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown as AntDropdown, Menu } from 'antd';

import './Dropdown.css';

export class Dropdown extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onClick: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
          className: PropTypes.string,
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
    const { options, menuClassName } = this.props;

    return (
      <Menu onClick={this.handleSelect} className={menuClassName}>
        {options.map(option => {
          const value = option.value || option;
          const key = option.key || value;
          const className = option.className || '';

          return (
            <Menu.Item key={key} className={className}>
              {value}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  handleSelect = event => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event.key);
    }
  };
}

export default Dropdown;
