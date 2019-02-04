import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import './Done.scss';

export class Done extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="Done">
        <div className="Done__register">
          <div className="Done__msg">All done. Thanks for registering!</div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Done));
