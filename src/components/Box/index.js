import React from 'react';

import './Box.css';

export default class Box extends React.Component {
  render() {
    const { className, transparent } = this.props;

    return (
      <div className={`Box ${className} ${transparent ? 'Box--transparent' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}
