import React from 'react';
import { Icon } from 'antd';

import Box from '~components/Box';
import Header from '~components/Header';
import TooltipButton from '~components/TooltipButton';
import './Profile.scss';
import EditProfile from './EditProfile';

export class Profile extends React.Component {
  handleEdit = () => {
    this.props.history.push(`/management/profile/edit`);
  };

  handleChangePassword = () => {
    this.props.history.push(`/management/change-admin-password`);
  };

  render() {
    return (
      <div className="Profile">
        <Header title="Profile" size="medium">
          <TooltipButton tooltip="Edit profile" type="primary" onClick={this.handleEdit}>
            <Icon type="form" theme="outlined" />
          </TooltipButton>
          <TooltipButton
            tooltip="Change password"
            type="primary"
            onClick={this.handleChangePassword}>
            <Icon type="lock" theme="outlined" />
          </TooltipButton>
        </Header>
        <Box className="Profile__box">
          <EditProfile disabled />
        </Box>
      </div>
    );
  }
}

export default Profile;
