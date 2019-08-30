import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents';

// 5. It must specify the number of events.
describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  const sampleEvents = {
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
    NumberOfEventsWrapper = shallow(<NumberOfEvents events={sampleEvents} />);
  });

  test('should render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('should render text input correctly', () => {
    const number = NumberOfEventsWrapper.state('number');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(number);
  });

  test('should change state when text input changes', () => {
    const eventObject = { target: { value: '23' } };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe('23');
  });

});
