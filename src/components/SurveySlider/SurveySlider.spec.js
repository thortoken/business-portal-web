import React from 'react';
import { shallow } from 'enzyme';

import { SurveySlider } from './SurveySlider';

const initSurveySlider = overrides => shallow(<SurveySlider {...overrides} />);

describe('component: <SurveySlider/>', () => {
  it('should render without crashes', () => {
    const wrapper = initSurveySlider();
    expect(wrapper).toBeTruthy();
  });

  it('should render description, votes count and slider', () => {
    const wrapper = initSurveySlider({
      description: 'fake description',
      votesCount: 33,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass all other props to the slider', () => {
    const sliderProps = { other1: 'value1', other2: 'value2' };
    const wrapper = initSurveySlider(sliderProps);
    expect(wrapper.find('Slider').props()).toMatchObject(sliderProps);
  });
});
