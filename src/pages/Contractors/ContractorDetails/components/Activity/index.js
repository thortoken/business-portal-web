import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import moment from 'moment';

import './Activity.scss';

export const values = {
  now: moment(),
};

const Activity = ({ lastActivityDate }) => {
  const days = values.now.diff(lastActivityDate, 'days');
  let type = {
    label: '',
    className: '',
  };

  if (days < 7) {
    type = {
      label: 'Active',
      className: 'active',
    };
  } else if (days >= 7 && days < 31) {
    type = {
      label: 'Resting',
      className: 'resting',
    };
  } else {
    type = {
      label: 'Inactive',
      className: 'inactive',
    };
  }

  return (
    <div className="Activity">
      <div
        className={classnames('', {
          [`Activity--${type.className}`]: true,
        })}>
        {type.label}
      </div>
    </div>
  );
};

Activity.propTypes = {
  lastActivityDate: PropTypes.string,
};

export default Activity;
