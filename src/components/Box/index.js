import React from 'react';

import './Box.css';

export default class Box extends React.Component {
  render() {
    return <div className="Box">{this.props.children}</div>;
  }
}
