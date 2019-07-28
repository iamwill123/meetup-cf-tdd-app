import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
// import your new EventList component into your test so that you’re able to find it via the shallow rendering API
import EventList from '../EventList';

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
describe('<App /> component', () => {
  test('should render list of events', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});
