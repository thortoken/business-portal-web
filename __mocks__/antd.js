const namedComponent = name => {
  const Component = ({ children }) => children;
  Component.displayName = name;
  return Component;
};

const Button = namedComponent('Button');

const Col = namedComponent('Col');

const Dropdown = namedComponent('Dropdown');

const Divider = namedComponent('Divider');

const Icon = namedComponent('Icon');

const Layout = namedComponent('Layout');
Layout.Content = namedComponent('Content');
Layout.Header = namedComponent('Header');
Layout.Sider = namedComponent('Sider');

const Menu = namedComponent('Menu');
Menu.Item = namedComponent('MenuItem');

const Progress = namedComponent('Progress');

const Row = namedComponent('Row');

const Switch = namedComponent('Switch');

const Slider = namedComponent('Slider');

const Steps = namedComponent('Steps');
Steps.Step = namedComponent('Step');

const Table = namedComponent('Table');
Table.Column = namedComponent('Column');
Table.Row = namedComponent('Row');

module.exports = {
  Button,
  Col,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Icon,
  Progress,
  Row,
  Switch,
  Slider,
  Steps,
  Table,
};
