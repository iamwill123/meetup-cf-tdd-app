import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow } from 'enzyme';
import { Event } from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventWrapper;

  const sampleEvent = {
    created: 1560297131000,
    duration: 7200000,
    id: 'swxdcryzlbjc',
    name: 'UXHQ Happy Hour',
    date_in_series_pattern: false,
    status: 'upcoming',
    time: 1566860400000,
    local_date: '2019-08-26',
    local_time: '19:00',
    updated: 1560297131000,
    utc_offset: -14400000,
    waitlist_count: 0,
    yes_rsvp_count: 87,
    venue: {
      id: 22076222,
      name: 'Stitch Bar & Lounge',
      lat: 40.75393295288086,
      lon: -73.99150085449219,
      repinned: true,
      address_1: '247 W 37th St',
      city: 'New York',
      country: 'US',
      localized_country_name: 'USA'
    },
    group: {
      created: 1452013461000,
      name: 'User Experience HQ (NYC)',
      id: 19283289,
      join_mode: 'open',
      lat: 40.72999954223633,
      lon: -73.98999786376953,
      urlname: 'userexperiencehq',
      who: 'members',
      localized_location: 'New York, NY',
      state: 'NY',
      country: 'us',
      region: 'en_US',
      timezone: 'US/Eastern'
    },
    link: 'https://www.meetup.com/userexperiencehq/events/swxdcryzlbjc/',
    description:
      '<p>Do not miss a great opportunity to mingle and hang out with fellow UX professionals! Make connections, friends and have fun!</p> <p>The event is BYOD (B is for buy, D is for Drinks so please do NOT bring your own drinks to the bar :)</p> ',
    how_to_find_us: 'We will be near the bar',
    visibility: 'public',
    member_pay_fee: false
  };

  beforeAll(() => {
    EventWrapper = shallow(<Event event={sampleEvent} />);
  });

  // Scenario 1
  test('An event details is collapsed (hidden) by default', ({
    given,
    when,
    then
  }) => {
    given('the user is looking at a list of events', () => {});

    when('the user scrolls through the event list', () => {});

    then('no event detail should be expanded (visible)', () => {
      expect(EventWrapper.state('show')).toBe(false);
    });
  });

  // Scenario 2
  test('User can expand an event to see its details', ({
    given,
    when,
    then
  }) => {
    given('the user is looking at a list of events', () => {});

    when('the user clicks on an event details button', () => {
      EventWrapper.find('.Event .details-btn').simulate('click');
    });

    then('the selected event should expand to show details', () => {
      expect(EventWrapper.state('show')).toBe(true);
      expect(EventWrapper.find('.detail-info')).toHaveLength(1);
    });
  });

  // Scenario 3
  test('User can collapse an event to hide its details', ({
    given,
    and,
    when,
    then
  }) => {
    given('the user is looking at an expanded event details', () => {});

    and('the details are showing', () => {
      expect(EventWrapper.find('.detail-info')).toHaveLength(1);
    });

    when('the user clicks the hide button to collapse the event', () => {
      EventWrapper.find('.Event .details-btn').simulate('click');
    });

    then('the event details is collapsed (hidden)', () => {
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.detail-info')).toHaveLength(0);
    });
  });
});
