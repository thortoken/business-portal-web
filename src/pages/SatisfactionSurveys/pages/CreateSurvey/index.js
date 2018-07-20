import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import mockTemplates from '../../mockTemplates';

export class CreateSurvey extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        templateId: PropTypes.number,
      }),
    }),
  };

  render() {
    const {
      match: {
        params: { templateId },
      },
    } = this.props;

    const template = mockTemplates.find(template => template.id === +templateId);
    return <div>Create a survey page {templateId && `based on template ${template.title}`} </div>;
  }
}

export default withRouter(CreateSurvey);
