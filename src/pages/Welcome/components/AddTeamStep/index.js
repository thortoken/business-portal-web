import React from 'react';

import Box from '~components/Box';
import Header from '~components/Header';

import BrandingForm from './components/BrandingForm';
import TeamMembersForm from './components/TeamMembersForm';

import './AddTeamStep.css';

const createEmptyTeamMember = () => ({ name: '', email: '', permission: [], id: +new Date() });

export default class AddTeamStep extends React.Component {
  state = {
    branding: {
      companyName: '',
    },
    teamMembers: [],
  };

  componentWillMount() {
    this.setState({
      teamMembers: [createEmptyTeamMember()],
    });
  }

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
      </div>
    );
  }

  handleAddTeamMember = () =>
    this.setState(prevState => ({
      teamMembers: [...prevState.teamMembers, createEmptyTeamMember()],
    }));
  handleDeleteTeamMember = id => {
    console.log('handleDeleteTeamMember', id);
    this.setState(prevState => ({
      teamMembers: prevState.teamMembers.filter(member => member.id !== id),
    }));
  };

  handleBrandingSubmit = values => {
    console.log('branding submit', values);
  };
  handleTeamMembersSubmit = values => {
    console.log('team members submit', values);
  };
}
