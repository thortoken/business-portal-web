import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import './ActionBar.scss';
import RefreshButton from '~components/RefreshButton';
import TooltipButton from '~components/TooltipButton';

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
          <TooltipButton
            tooltip="Add contractor"
            type="primary"
            size="default"
            onClick={this.handleAdd}>
            <Icon type="plus" />
          </TooltipButton>
          <RefreshButton handleRefresh={handleRefresh} isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default withRouter(ActionBar);
