import React from 'react';

import Box from '~components/Box';
import Header from '~components/Header';

import BrandingForm from './components/BrandingForm';
import TeamMembersForm from './components/TeamMembersForm';
import ContractorsForm from './components/ContractorsForm';

import './AddTeamStep.css';

export default class AddTeamStep extends React.Component {
  state = {
    branding: {
      companyName: '',
    },
    teamMembers: [],
  };

  render() {
    const { branding, teamMembers } = this.state;

    return (
      <div className="AddTeamStep">
        <Box padding>
          <Header title="Put your brand on things!" size="small" />
          <BrandingForm initialValues={branding} onSubmit={this.handleBrandingSubmit} />
        </Box>
        <Box padding>
          <Header title="Core Team" size="small" />
          <TeamMembersForm
            initialValues={{ teamMembers }}
            onSubmit={this.handleTeamMembersSubmit}
          />
        </Box>
        <Box padding>
          <Header title="Contractors" size="small" />
          <ContractorsForm />
        </Box>
      </div>
    );
  }

  handleBrandingSubmit = values => {
    console.log('branding submit', values);
  };
  handleTeamMembersSubmit = values => {
    console.log('team members submit', values);
  };
}
