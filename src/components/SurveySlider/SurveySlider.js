import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

import './SurveySlider.css';

export class SurveySlider extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    votesCount: PropTypes.number,
  };

  static defaultProps = {
    votesCount: 0,
  };

  render() {
    const { description, votesCount, ...sliderProps } = this.props;
    return (
      <div className="SurveySlider">
        <p className="SurveySlider-description">{description}</p>
        <Slider className="SurveySlider-slider" {...sliderProps} />
        <div className="SurveySlider-results">{votesCount} responses</div>
      </div>
    );
  }
}

export default SurveySlider;
