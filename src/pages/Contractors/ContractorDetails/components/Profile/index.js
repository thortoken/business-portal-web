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
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    handleGoToFundingSources: PropTypes.func,
    handleRetryContractor: PropTypes.func,
    handleGoToDocuments: PropTypes.func,
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
      handleDelete,
      handleEdit,
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
            <Activity lastActivityDate={updatedAt} />
            <Button className="Profile--button" onClick={handleEdit}>
              <Icon type="form" theme="outlined" />
            </Button>
            <Button className="Profile--button" onClick={handleDelete}>
              <Icon type="delete" theme="outlined" />
            </Button>
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
    const {
      hasFundingSource,
      handleGoToFundingSources,
      handleRetryContractor,
      externalStatus,
      handleGoToDocuments,
    } = this.props;
    const warnings = [];
    if (!hasFundingSource) {
      warnings.push({
        key: 'Funding Source',
        content: (
          <p className="Profile-warning">
            {warnings.length + 1}. Add funding source for this user{' '}
            <span className="Profile-link" onClick={handleGoToFundingSources}>
              here
            </span>.
          </p>
        ),
      });
    }
    if (externalStatus === 'retry') {
      warnings.push({
        key: 'Dwolla error',
        content: (
          <p className="Profile-warning">
            {warnings.length + 1}. Resend your data{' '}
            <span className="Profile-link" onClick={handleRetryContractor}>
              here
            </span>.
          </p>
        ),
      });
    }
    if (externalStatus === 'document') {
      warnings.push({
        key: 'Document error',
        content: (
          <p className="Profile-warning">
            {warnings.length + 1}. Resend your documents{' '}
            <span className="Profile-link" onClick={handleGoToDocuments}>
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
