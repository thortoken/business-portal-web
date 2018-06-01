import React from 'react';

import Box from '~components/Box';
import Header from '~components/Header';

export default class ConnectBankStep extends React.Component {
  render() {
    return (
      <Box padding>
        <Header title="Select Your Bank" size="small" />
      </Box>
    );
  }
}
