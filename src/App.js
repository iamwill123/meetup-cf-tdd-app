import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

class App extends Component {
  updateEvents = events => {
    console.log(events);
  };
  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <EventList />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
