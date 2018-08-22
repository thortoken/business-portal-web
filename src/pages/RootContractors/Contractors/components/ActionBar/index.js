import React from 'react';
import { Button } from 'antd';

import './ActionBar.css';

class ActionBar extends React.Component {
  render() {
    return (
      <div className='ActionBar'>
        <Button type="primary" icon="plus" size='default'>Add contractors</Button>
      </div>
    );
  }
}
export default ActionBar;
