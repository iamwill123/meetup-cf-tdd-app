import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
// import your new EventList component into your test so that you’re able to find it via the shallow rendering API
import EventList from '../components/EventList';

import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';
import { mockEvents } from '../api/mock-data/mock-events';
import { Event } from '../components/Event';

// Basic list of functions we can use:
// find(selector): locates every node that matches the selector (a CSS selector, a component constructor, etc). It returns another wrapper surrounding any nodes it finds. You can then call additional functions on this new wrapper.
// props(): returns the props of the current node.
// prop(name): returns the prop with the specified name in the current node.
// state(name): returns the state with the specified name in the current node.
// text(): returns the inner text of the current node.
// at(index): returns a wrapper of the node at the specified index.
// setState(nextState[, callback]): similar to setState in a React component.
// simulate(eventName[, object]): simulates an event on the root node of the wrapper. (object represents the object you want to pass through the event handlers).

// create a new group, or “scope” for test
// unit test
describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('should render list of events from EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('should render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('should render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// integration test
describe('<App /> integration', () => {
  test('should get list of events after user selects a city', async () => {
    const AppWrapper = mount(<App />);
    // ref-1: updateEvents & jest.fn()
    AppWrapper.instance().updateEvents = jest.fn();
    // ref-2: forceUpdate()
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked('value', 1.1, 1.2);
    // ref-3: Jest functions:
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2);
    AppWrapper.unmount();
  });

  test('should change state after get list of events', async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state('events')).toEqual(mockEvents.events);
  });

  test('should render correct list of events', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    expect(AppWrapper.find(Event)).toHaveLength(4);
    AppWrapper.unmount();
  });
});

// ref-1
// In order to test a function, you need to mock it. In other words, you tell Jest to execute the function on the component so you can see the results. This is handled by the function jest.fn(), which you can see has been set to the updateEvents() function, as that’s the function you want to mock.

// ref-2
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md#update--shallowwrapper

// ref-3
// https://jest-bot.github.io/jest/docs/expect.html
