import React from 'react';
import { shallow } from 'enzyme';

// import your new EventList component into your test so that you’re able to find it via the shallow rendering API
import EventList from '../components/EventList';
import Event from '../components/Event';

// create a new group, or “scope” for test
describe('<EventList /> component', () => {
  // 1. By default, when user hasn’t searched for a city, show upcoming events based on the user’s location.
  test('should render correct number of events', () => {
    const EventListWrapper = shallow(<EventList />);
    // Our mock data (the minimum amount of data required for the component to be functional)
    let events = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    EventListWrapper.setState({ events });
    expect(EventListWrapper.find(Event)).toHaveLength(5);
  });
});
