import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './Modal.css';

export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onClose: PropTypes.func,
    title: PropTypes.string,
  };

  static defaultProps = {
    className: 'slideInUp',
    onClose: () => {},
  };

  render() {
    const { children, className, onClose, title } = this.props;
    return (
      <div className={`Modal animated ${className}`}>
        <div className="Modal__body">
          <div className="Modal__container">
            <div className="Modal__header">
              <Button
                className="Modal__header--close-button"
                type="default"
                shape="circle"
                icon="close"
                size="default"
                onClick={onClose}
              />
              <div className="Modal__header--title">{title}</div>
            </div>
            <div className="Modal__content">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
