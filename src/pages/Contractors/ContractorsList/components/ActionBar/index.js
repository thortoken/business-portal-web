import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import './ActionBar.css';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    this.props.history.push('/contractors/add');
  }

  render() {
    return (
      <div>
        <div className="ActionBar">
          <Button type="primary" icon="plus" size="default" onClick={this.handleAdd}>
            Add contractors
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ActionBar);
