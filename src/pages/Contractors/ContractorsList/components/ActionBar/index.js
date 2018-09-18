import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import './ActionBar.css';
import RefreshButton from '~components/RefreshButton';

class ActionBar extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func,
    isLoading: PropTypes.bool,
  };
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    this.props.history.push('/contractors/add');
  }

  render() {
    const { handleRefresh, isLoading } = this.props;
    return (
      <div>
        <div className="ActionBar">
          <Button type="primary" icon="plus" size="default" onClick={this.handleAdd}>
            Add contractor
          </Button>
          <RefreshButton handleRefresh={handleRefresh} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default withRouter(ActionBar);
