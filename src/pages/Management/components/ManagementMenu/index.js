import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt, Icon } from 'antd';
import connect from 'react-redux/es/connect/connect';
import './ManagementMenu.scss';

const menuItems = [
  { route: '/management/company-details', label: 'Company Details', icon: 'home' },
  // { route: '/management/beneficial-owners', label: 'Beneficial Owners', icon: 'crown' },
  { route: '/management/billing', label: 'Billing Settings', icon: 'dollar' },
  { route: '/management/company-team', label: 'Manage Team', icon: 'team' },
  { route: '/management/jobs', label: 'Manage Jobs', icon: 'tool' },
  // { route: '/management/integrations', label: 'Integrations', icon: 'shrink' },
  { route: '/management/profile', label: 'My Profile', icon: 'user' },
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
