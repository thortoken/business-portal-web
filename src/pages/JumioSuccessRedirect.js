import React from 'react';

export default class JumioSuccessRedirect extends React.Component {
  componentDidMount() {
    window.parent.jumioSuccess();
  }
  render() {
    return <div />;
  }
}
