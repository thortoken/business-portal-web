import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'antd';

import Box from '~components/Box';
import DividedSection from '~components/DividedSection';
import Header from '~components/Header';

import mockTemplates from '../../mockTemplates';
import './Main.css';

export class Main extends Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { match } = this.props;

    return (
      <div className="Main">
        <Header title="Satisfaction Surveys" size="large" />
        <Box backgroundColor="blue" padding>
          <div className="Main-description">
            <img
              className="Main-description-image"
              src="images/satisfaction_survey_description.png"
            />
            <div className="Main-description-text">
              <strong>Keep your contractors Happy.</strong>
              <br />
              Understand when and why they are unsatisfied - and elevate satisfaction over time.
            </div>
          </div>
        </Box>

        <Box backgroundColor="white" padding>
          <DividedSection orientation="horizontal">
            <DividedSection.Cell>
              <Link to={`${match.path}/create`}>
                <Button type="primary" size="large" ghost>
                  Write a Survey
                </Button>
              </Link>
            </DividedSection.Cell>
            <DividedSection.Cell>
              <div>
                <Header title="Choose a Template" size="medium" />
                {mockTemplates.map(template => (
                  <div key={template.id}>
                    <Link to={`${match.path}/create/${template.id}`}>
                      <Button type="primary" ghost>
                        {template.title}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </DividedSection.Cell>
          </DividedSection>
        </Box>
      </div>
    );
  }
}

export default withRouter(Main);
