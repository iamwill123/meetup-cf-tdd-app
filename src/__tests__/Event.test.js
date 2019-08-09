import React from 'react';
import { shallow } from 'enzyme';
import Event from '../components/Event';

// Test 4: It must be able to show/hide an event details.
// create a new group, or “scope” for test
describe('<Event /> component', () => {
  let EventWrapper;

  const sampleEvent = {
    city: 'Brooklyn',
    country: 'us',
    localized_country_name: 'USA',
    state: 'NY',
    name_string: 'Brooklyn, New York, USA',
    zip: '11201',
    lat: 40.7,
    lon: -73.99
  };

  beforeAll(() => {
    EventWrapper = shallow(<Event event={sampleEvent} />);
  });
  // 1. to verify whether all the necessary elements have been rendered
  test('should render an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });
  test('should expect an event name to match', () => {
    expect(EventWrapper.find('.event-name').text()).toBe(
      'Brooklyn, New York, USA'
    );
  });
  // 2. check if detailed info is shown when a user clicks on a “Details” button
  test('click on details button should toggle show/hide detail information', () => {
    // initial click true
    EventWrapper.find('.event .detail-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
    expect(EventWrapper.find('.detail-info')).toHaveLength(1);
    // click again, false
    EventWrapper.find('.event .detail-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(false);
    expect(EventWrapper.find('.detail-info')).toHaveLength(0);
  });
});
