import React from 'react';
import { shallow } from 'enzyme';
import Event from '../components/Event';

// Test 4: It must be able to show/hide an event details.
// create a new group, or “scope” for test
describe('<Event /> component', () => {
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
  // 1. to verify whether all the necessary elements have been rendered
  test('should render an event', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
  });
  test('should expect an event name to match', () => {
    expect(EventWrapper.find('.name').text()).toBe('Event: UXHQ Happy Hour');
  });
  // 2. check if detailed info is shown when a user clicks on a “Details” button
  test('click on details button should toggle show/hide detail information', () => {
    // initial click true
    EventWrapper.find('.Event .details-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
    expect(EventWrapper.find('.detail-info')).toHaveLength(1);
    // click again, false
    EventWrapper.find('.Event .details-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(false);
    expect(EventWrapper.find('.detail-info')).toHaveLength(0);
  });
});
