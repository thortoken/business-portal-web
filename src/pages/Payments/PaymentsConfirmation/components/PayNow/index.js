import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import './PayNow.css';
import { Icon, Progress, Popover } from 'antd';

const generateErrorItems = list => {
  list = new Array(list);
  return list.map((item, index) => {
    return (
      <p key={item} className="Pay-now__error">
        {index + 1}. {item}
      </p>
    );
  });
};

export class PayNow extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    done: PropTypes.number,
    error: PropTypes.number,
    all: PropTypes.number,
    submitted: PropTypes.bool,
    errorList: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  render() {
    const { active, title, done, error, all, submitted, errorList, isLoading } = this.props;
    const percent = parseInt(((done + error) * 100 / all).toFixed(0), 10);
    let status = 'active';
    if (!isLoading && errorList.size === 0) {
      status = 'success';
    } else if (!isLoading && errorList.size > 0) {
      status = 'exception';
    }
    const content = <div>{generateErrorItems(errorList)}</div>;
    return (
      <div className={classnames('Pay-now', { [`Pay-now--active`]: active })}>
        <div className={classnames('Pay-now__header', { [`Pay-now--value`]: active })}>{title}</div>
        <div className="Pay-now__box">
          <div className="Pay-now__row">
            Payments Transferred:{' '}
            <span className={classnames({ [`Pay-now--done`]: active })}>{done}</span>
          </div>
          <div className="Pay-now__row">
            Payments Rejected:{' '}
            <span className={classnames({ [`Pay-now--error`]: active })}>{error}</span>
            {errorList.size > 0 && (
              <Popover content={content} title="Errors" placement="right" trigger="hover">
                <Icon type="eye" theme="outlined" className="Pay-now__error-icon" />
              </Popover>
            )}
          </div>
          <div className="Pay-now__row">
            Total Payments: <span className={classnames({ [`Pay-now--all`]: active })}>{all}</span>
          </div>
        </div>
        {submitted && (
          <div className="Pay-now__box Pay-now__box--centered">
            <Progress type="circle" percent={percent} status={status} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, null)(PayNow);
