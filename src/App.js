import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api/mock-data/mock-events';

class App extends Component {
  state = {
    events: []
  };

  updateEvents = (lat, lon) => {
    getEvents(lat, lon).then(events => this.setState({ events }));
  };

  render() {
    const { events } = this.state;
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <EventList events={events} />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
