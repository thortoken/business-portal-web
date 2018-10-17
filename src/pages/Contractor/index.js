import React from 'react';

import connect from 'react-redux/es/connect/connect';

// import './ContractorPage.css';

export class ContractorPage extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {
    const { checkFundingSource, history } = this.props;
    const response = await checkFundingSource();
    console.log(response);
    if (response.status === 404) {
      history.push('/on-boarding/bank');
    }
  }

  render() {
    return <div className="Terms">contractor</div>;
  }
}

//const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  checkFundingSource: dispatch.onBoarding.checkFundingSource,
});

export default connect(null, mapDispatchToProps)(ContractorPage);
