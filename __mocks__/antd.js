const { namedComponent } = require('./helpers');

const Button = namedComponent('Button');

const Col = namedComponent('Col');

const DatePicker = namedComponent('DatePicker');

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

const Select = namedComponent('Select');
Select.Option = namedComponent('Option');

const Switch = namedComponent('Switch');

const Slider = namedComponent('Slider');

const Spin = namedComponent('Spin');

const Steps = namedComponent('Steps');
Steps.Step = namedComponent('Step');

const Table = namedComponent('Table');
Table.Column = namedComponent('Column');
Table.Row = namedComponent('Row');

const notification = {
  config: jest.fn(),
  open: jest.fn(),
  close: jest.fn(),
  destroy: jest.fn(),
};

module.exports = {
  Button,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Icon,
  Layout,
  Menu,
  notification,
  Progress,
  Row,
  Select,
  Switch,
  Slider,
  Spin,
  Steps,
  Table,
};
