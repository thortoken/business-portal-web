import React from 'react';
import { Dropdown as AntDropdown, Menu } from 'antd';

export default class Dropdown extends React.Component {
  render() {
    const { children } = this.props;

    const menu = this.renderMenu();
    return (
      <AntDropdown overlay={menu} trigger={['click']}>
        {children}
      </AntDropdown>
    );
  }

  renderMenu() {
    const { onClick, options } = this.props;

    return (
      <Menu onClick={onClick}>
        {options.map(option => {
          const value = option.value || option;
          const key = option.key || value;
          return <Menu.Item key={key}>{value}</Menu.Item>;
        })}
      </Menu>
    );
  }
}
