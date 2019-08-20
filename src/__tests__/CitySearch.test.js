import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../components/CitySearch';
import { returnedSuggestionsData } from '../api/mock-data/MockData';

// unit test
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

  test('should render list of suggestions correctly', () => {
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

  test('click on suggestion should change query state', () => {
    CitySearchWrapper.setState({
      suggestions: returnedSuggestionsData
    });

    CitySearchWrapper.find('.suggestions li')
      .at(0)
      .simulate('click');
    expect(CitySearchWrapper.state('query')).toBe('Brooklyn, New York, USA');
  });
});

// integration test
describe('<CitySearch /> integration', () => {
  test('should get a list of cities when user searches for Brooklyn', async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Brooklyn' }
    });
    await CitySearchWrapper.update();
    // rather than the toBe() function, a new toEqual() function is being used to run your comparison. This is because the values being compared are objects.
    expect(CitySearchWrapper.state('suggestions')).toEqual(
      returnedSuggestionsData
    );
  });
});

// Notes:
// toBe(): comparing primitive data types,
// toEqual(): compare complex data types such as objects. This is because the toEqual() function is designed to recursively check every field of an object or array.
