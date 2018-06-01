import React from 'react';

import Box from '~components/Box';
import Header from '~components/Header';

export default class EnablePaymentsStep extends React.Component {
  render() {
    return (
      <Box padding>
        <Header title="Enable Your Payments" size="small" />
      </Box>
    );
  }
}
