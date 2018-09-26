import React from 'react';
import { connect } from 'react-redux';

import './Thanks.css';

export class Thanks extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/sign-in');
    }, 3000);
  }

  render() {
    const { lastCreatedContractor } = this.props;

    console.log('lastCreatedContractor', lastCreatedContractor);
    return (
      <div className="Thanks">
        <div className="Thanks__register">
          <div className="Thanks__msg">
            Thanks for registration{' '}
            {lastCreatedContractor.length > 0 && lastCreatedContractor.tenantProfile.firstName}{' '}
            {lastCreatedContractor.length > 0 && lastCreatedContractor.tenantProfile.lastName}!
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
