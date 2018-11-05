import React from 'react';

import PropTypes from 'prop-types';
import { Button, Icon, Popover } from 'antd';
import Activity from '../Activity';

import { renderDate } from '~utils/time';
import { formatPhone } from '~utils/number';

import './Profile.scss';
import RefreshButton from '~components/RefreshButton';

export default class Profile extends React.PureComponent {
  static propTypes = {
    handleRefresh: PropTypes.func,
    isLoading: PropTypes.bool,
    hasFundingSource: PropTypes.bool,
    openAddFundingSourceModal: PropTypes.func,
    handleGoToFundingSources: PropTypes.func,
  };

  render() {
    const {
      firstName,
      lastName,
      updatedAt,
      createdAt,
      address1,
      address2,
      city,
      state,
      postalCode,
      phone,
      children,
      handleRefresh,
      isLoading,
      handleGoToFundingSources,
    } = this.props;
    const warningsList = this.verifyUserProfile();
    return (
      <div className="Profile">
        <div className="Profile-box-informations">
          <div className="Profile-basic-data">
            <div className="Profile-name">
              {firstName} {lastName}
              {warningsList.length > 0 && (
                <Popover content={this.renderPopOver(warningsList)} title="Warning">
                  <Icon type="exclamation-circle" theme="twoTone" className="Profile-icon" />
                </Popover>
              )}
            </div>
            <div className="Profile-since">Contractor since {renderDate(createdAt)}</div>
          </div>
          <div className="Profile-activity">
            <Button
              type="primary"
              ghost
              className="Profile--button"
              onClick={handleGoToFundingSources}>
              Funding Sources
            </Button>
            <Activity lastActivityDate={updatedAt} />
            <RefreshButton handleRefresh={handleRefresh} isLoading={isLoading} />
          </div>
        </div>
        <div className="Profile-box-informations">
          <div className="Profile-address">
            <div className="Profile-label">Address</div>
            <div className="Profile-value">
              <div>
                {address1} {address2}
              </div>
              <div>
                {city} {state}
                {postalCode}
              </div>
            </div>
          </div>
          <div className="Profile-phone">
            <div className="Profile-label">Phone</div>
            <div className="Profile-value">{formatPhone(phone)}</div>
          </div>
          <div className="Profile-options">{children}</div>
        </div>
      </div>
    );
  }

  verifyUserProfile = () => {
    const { hasFundingSource } = this.props;
    const warnings = [];
    if (!hasFundingSource) {
      const { openAddFundingSourceModal } = this.props;
      warnings.push({
        key: 'Funding Source',
        content: (
          <p className="Profile-warning">
            1. Add funding source for this user{' '}
            <span className="Profile-link" onClick={openAddFundingSourceModal}>
              here
            </span>.
          </p>
        ),
      });
    }
    return warnings;
  };

  renderPopOver = warnings => {
    return <div>{warnings.map(warning => <div key={warning.key}>{warning.content}</div>)}</div>;
  };
}
