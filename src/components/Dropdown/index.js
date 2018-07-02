import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as AntDropdown, Menu } from 'antd';

export class Dropdown extends React.Component {
  static propTypes = {
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
    const { children, options, onClick, ...dropdownProps } = this.props;

    const menu = this.renderMenu();
    return (
      <AntDropdown overlay={menu} trigger={['click']} {...dropdownProps}>
        {children}
      </AntDropdown>
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
