import React from 'react';

import './Box.css';

export default class Box extends React.Component {
  render() {
    const { className } = this.props;

    return <div className={`Box ${className}`}>{this.props.children}</div>;
  }
}
