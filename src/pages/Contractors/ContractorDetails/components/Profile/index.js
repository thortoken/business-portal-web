import React from 'react';

import Activity from '../Activity';

import { renderDate } from '~utils/time';

import './Profile.css';

export default class Profile extends React.PureComponent {
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
    } = this.props;

    return (
      <div className="Profile">
        <div className="Profile-box-informations">
          <div className="Profile-basic-data">
            <div className="Profile-name">
              {firstName} {lastName}
            </div>
            <div className="Profile-since">Contractor since {renderDate(createdAt)}</div>
          </div>
          <div className="Profile-activity">
            <Activity lastActivityDate={updatedAt} />
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
            <div className="Profile-value">{phone}</div>
          </div>
          <div className="Profile-options">{children}</div>
        </div>
      </div>
    );
  }
}
