import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import classNames from 'classnames';

import './Modal.css';

export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      isVisible: false
    })
  }

  open(event) {
    this.setState({
      isVisible: true
    })
  }

  render() {
    const { children, title } = this.props;
    const { isVisible } = this.state;
    return (
      isVisible ?
        <div className={classNames('Modal animated', { slideInUp: isVisible })}>
          <div className="Modal__body">
            <div className="Modal__container">
              <div className="Modal__header">
                <Button className="Modal__header--close-button" type="default" shape="circle" icon="close"
                        size="default"
                        onClick={this.close}/>
                <div className="Modal__header--title">
                  {title}
                </div>
              </div>
              <div className="Modal__content">
                {children}
              </div>
            </div>
          </div>
        </div>
        : <div/>
    );
  }
}

export default Modal;
