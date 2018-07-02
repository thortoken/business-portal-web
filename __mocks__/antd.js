const namedComponent = name => {
  const Component = ({ children }) => children;
  Component.displayName = name;
  return Component;
};

const Icon = namedComponent('Icon');

const Layout = namedComponent('Layout');
Layout.Content = namedComponent('Content');
Layout.Sider = namedComponent('Sider');

const Menu = namedComponent('Menu');
Menu.Item = namedComponent('MenuItem');

const Steps = namedComponent('Steps');
Steps.Step = namedComponent('Step');

const Table = namedComponent('Table');
Table.Column = namedComponent('Column');
Table.Row = namedComponent('Row');

const Slider = namedComponent('Slider');

module.exports = {
  Layout,
  Menu,
  Icon,
  Slider,
  Steps,
  Table,
};
