import React from 'react';
import { connect } from 'react-redux';

import './Thanks.css';

export class Thanks extends React.Component {
  render() {
    const { lastCreatedContractor } = this.props;

    return (
      <div className="Thanks">
        <div className="Thanks__register">
          <div className="Thanks__msg">
            Thanks for registration {lastCreatedContractor && lastCreatedContractor.firstName}{' '}
            {lastCreatedContractor && lastCreatedContractor.lastName}!
          </div>
        </div>
      </div>
    );
  }

  handleNextStep = () => {
    this.props.history.push(`register/contractor`);
  };
}

const mapStateToProps = state => ({
  lastCreatedContractor: state.users.lastCreatedContractor,
});

export default connect(mapStateToProps, null)(Thanks);
