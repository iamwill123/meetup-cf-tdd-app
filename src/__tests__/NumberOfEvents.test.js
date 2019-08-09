import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents';

// 5. It must specify the number of events.
describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('should render text input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('should render text input correctly', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(query);
  });

  test('should change state when text input changes', () => {
    const eventObject = { target: { value: '23' } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('query')).toBe('23');
  });

  // test('should render list of suggestions correctly', () => {
  //   const suggestions = NumberOfEventsWrapper.state('suggestions');
  //   expect(NumberOfEventsWrapper.find('.suggestions li')).toHaveLength(
  //     suggestions.length
  //   );
  //   for (let i = 0; i < suggestions.length; i++) {
  //     expect(
  //       NumberOfEventsWrapper.find('.suggestions li')
  //         .at(i)
  //         .text()
  //     ).toBe(suggestions[i].name_string);
  //   }
  // });

  // test('click on suggestion should change query state', () => {
  //   NumberOfEventsWrapper.setState({
  //     suggestions: suggestionsData
  //   });

  //   NumberOfEventsWrapper.find('.suggestions li')
  //     .at(0)
  //     .simulate('click');
  //   expect(NumberOfEventsWrapper.state('query')).toBe('Brooklyn, New York, USA');
  // });
});
