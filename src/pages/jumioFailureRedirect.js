import React from 'react';

export default class JumioFailureRedirect extends React.Component {
  componentDidMount() {
    window.parent.jumioFailure();
  }
  render() {
    return <div />;
  }
}