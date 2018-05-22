import React from 'react';
import { Slider } from 'antd';

import './SurveySlider.css';

export default class SurveySlider extends React.Component {
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
