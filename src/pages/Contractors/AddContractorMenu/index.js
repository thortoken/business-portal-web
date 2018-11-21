import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';
import Dropdown from '~components/Dropdown';

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

class AddContractorMenu extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push(`/contractors/add`);
  };

  handleInvite = () => {
    const { history } = this.props;
    history.push(`/contractors/invite`);
  };

  handleUpload = () => {
    const { history } = this.props;
    history.push(`/contractors/invite/upload`);
  };

  render() {
    const menuList = [
      {
        key: 'add',
        action: this.handleAdd,
        label: 'Add Contractor',
      },
      {
        key: 'invite',
        action: this.handleInvite,
        label: 'Invite Contractor',
      },
      {
        key: 'upload',
        action: this.handleUpload,
        label: 'Upload invite CSV',
      },
    ];
    const { match } = this.props;
    return (
      <Dropdown options={generateMenuItems(menuList, match.params.id)}>
        <Button size="default" type="primary">
          <Icon type="plus" theme="outlined" />
        </Button>
      </Dropdown>
    );
  }
}

export default withRouter(AddContractorMenu);
