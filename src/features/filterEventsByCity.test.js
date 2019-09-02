import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { mockEvents } from '../api/mock-data/mock-events';
import CitySearch from '../components/CitySearch';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  // Scenario 1
  test('By default, when user hasn’t searched for a city, show upcoming events based on the user’s location', ({
    given,
    when,
    then
  }) => {
    given('user hasn’t searched for any city', () => {});

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then(
      'the user should see the list of upcoming events from their location',
      () => {
        AppWrapper.update();
        expect(AppWrapper.find('.Event')).toHaveLength(
          mockEvents.events.length
        );
      }
    );
  });

  // Scenario 2
  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then
  }) => {
    let CitySearchWrapper;
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch />);
    });

    when('user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', {
        target: { value: 'Brooklyn' }
      });
    });

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed',
      () => {
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(10);
      }
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then
  }) => {
    given('user was typing "Brooklyn" in the city textbox', () => {});

    and('the list of suggested cities is showing', () => {});

    when(
      'the user selects a city (e.g., "Brooklyn, New York") from the list',
      () => {}
    );

    then(
      'their city should be changed to that city (i.e., "Brooklyn, New York")',
      () => {}
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {}
    );
  });
});
