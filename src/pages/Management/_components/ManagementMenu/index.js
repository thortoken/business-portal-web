import React from 'react';

import { Link } from 'react-router-dom';

import './ManagementMenu.scss';
import { Menu as MenuAnt, Icon } from 'antd';
import connect from 'react-redux/es/connect/connect';

const menuItems = [
  { route: '/management/company-details', label: 'Company Details', icon: 'home' },
  { route: '/management/beneficial-owners', label: 'Beneficial Owners', icon: 'crown' },
  // { route: '/management/company-team', label: 'Company & Team', icon: 'user' },
  { route: '/management/linked-accounts', label: 'Linked Accounts', icon: 'bank' },
  { route: '/management/jobs', label: 'Jobs', icon: 'tags' },
  { route: '/management/change-admin-password', label: 'Change Password', icon: 'lock' },
  // { route: '/management/integrations', label: 'Integrations', icon: 'shrink' },
  // { route: '/management/settings', label: 'Settings', icon: 'setting' },
];

export const generateMenuItems = list => {
  return list.map(item => (
    <MenuAnt.Item key={item.route} className="ManagementMenu__link">
      <Link to={item.route}>
        <Icon type={item.icon} theme="outlined" /> <span>{item.label}</span>
      </Link>
    </MenuAnt.Item>
  ));
};

export class ManagementMenu extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.menuItems = menuItems;
    this.generateMenuItems = generateMenuItems;
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { pathname } = this.props;
    let selectedKeys = [];
    selectedKeys.push(pathname);
    return (
      <div className="ManagementMenu">
        <MenuAnt mode="vertical" selectedKeys={selectedKeys} className="Menu">
          {this.generateMenuItems(menuItems)}
          <MenuAnt.Item key="/" className="ManagementMenu__link">
            <Link to="/" onClick={this.handleLogout}>
              <Icon type="logout" theme="outlined" /> <span>Logout</span>
            </Link>
          </MenuAnt.Item>
        </MenuAnt>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: dispatch.auth.logout,
});
const mapState = ({ router }) => ({ pathname: router.location.pathname });
export default connect(mapState, mapDispatchToProps)(ManagementMenu);
