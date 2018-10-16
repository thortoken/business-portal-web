import React from 'react';

// import './Terms.css';
import connect from 'react-redux/es/connect/connect';

export class ContractorPage extends React.Component {
  static propTypes = {};
  state = {};
  render() {
    return <div className="Terms">contractor</div>;
  }
}
//
// const mapDispatchToProps = dispatch => ({
//   saveAgreement: dispatch.onBoarding.saveAgreement,
//   getAgreement: dispatch.onBoarding.getAgreement,
// });

export default connect(null, null)(ContractorPage);
