import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({
    given,
    when,
    then
  }) => {
    let NumberOfEventsWrapper;

    given('that no number is specified', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    when('the user is looking at a list of events', () => {});

    then('the user sees 32 events by default', () => {
      expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then
  }) => {
    let AppWrapper;

    given('that the user is looking at a list of events', () => {
      AppWrapper = mount(<App />);
    });

    when('the user changes the number in the input box', () => {
      const number = { target: { value: 5 } };
      AppWrapper.find('.number-of-events').simulate('change', number);
    });

    then('the user will see the specified number of events', () => {
      expect(AppWrapper.state('page')).toBe(5);
    });
  });
});
