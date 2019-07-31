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

  test('should render text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('should change state when text input changes', () => {
    const eventObject = { target: { value: 'Brooklyn' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Brooklyn');
  });

  test('render list of suggestions correctly', () => {
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length
    );
    for (let i = 0; i < suggestions.length; i++) {
      expect(
        CitySearchWrapper.find('.suggestions li')
          .at(i)
          .text()
      ).toBe(suggestions[i].name_string);
    }
  });
});
