import React from 'react';

import connect from 'react-redux/es/connect/connect';

import Box from '~components/Box';

import './BeneficialOwners.scss';

export class BeneficialOwners extends React.Component {
  static propTypes = {};
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <div className="BeneficialOwners">BeneficialOwners</div>
      </Box>
    );
  }
}

//const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(BeneficialOwners);
