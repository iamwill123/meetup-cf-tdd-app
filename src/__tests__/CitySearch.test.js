import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch />);
  });

  test('should render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('should render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
});
