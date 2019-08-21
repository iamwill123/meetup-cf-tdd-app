import React, { Component } from 'react';
import Event from './Event';
// import { suggestionsData } from '../mock-data/MockData';
class EventList extends Component {
  render() {
    const { events } = this.props;
    if (!events) return <div>Loading...</div>;
    return (
      <ul className="EventList">
        {events.map(event => (
          <li key={event.lat}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
