import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import TooltipButton from '~components/TooltipButton';
import Dropdown from '~components/Dropdown';
import './AddTransactionMenu.scss';

const generateMenuItems = list => {
  return list.filter(e => !e.isHidden).map(element => {
    return {
      key: element.key,
      value: (
        <div onClick={element.action}>
          <span>{element.label}</span>
        </div>
      ),
      className: element.className || '',
    };
  });
};

class AddTransactionMenu extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    isLoading: PropTypes.bool,
    type: PropTypes.string.isRequired,
  };

  handleExisting = () => {
    const { history, match, userId } = this.props;
    if (userId) {
      history.push(`${match.path}/${userId}/transactions/existing`);
    } else {
      history.push(`${match.path}/transactions/existing`);
    }
  };

  handleCustom = () => {
    const { history, match, userId } = this.props;
    if (userId) {
      history.push(`${match.url}/${userId}/transactions/custom`);
    } else {
      history.push(`${match.url}/transactions/custom`);
    }
  };

  render() {
    const menuList = [
      {
        key: 'existing',
        action: this.handleExisting,
        label: 'With existing job',
      },
      {
        key: 'custom',
        action: this.handleCustom,
        label: 'With custom job',
      },
    ];
    const { match, type } = this.props;
    return (
      <Dropdown options={generateMenuItems(menuList, match.params.id)}>
        <TooltipButton placement="top" tooltip="Add a transaction" size="default" type={type}>
          <Icon type="plus" theme="outlined" className="AddTransactionMenu__icon" />
        </TooltipButton>
      </Dropdown>
    );
  }
}

export default withRouter(AddTransactionMenu);
