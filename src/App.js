import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api/api';

class App extends Component {
  state = {
    events: [],
    lat: null,
    lon: null,
    page: null
  };

  componentDidMount() {
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    // We use state to store value of lat, lon, page if user has changed it.
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events =>
        this.setState({ events, lat, lon })
      );
    } else if (page) {
      // To limit the number of events you get from the API, you can specify a page param: https://www.meetup.com/meetup_api/docs/find/upcoming_events/
      getEvents(this.state.lat, this.state.lon, page).then(events =>
        this.setState({ events, page })
      );
    } else {
      // If “lat” and “lon” aren’t specified, Meetup will return a list of events based on the location from which the request was made (i.e., the user’s location).
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events =>
        this.setState({ events })
      );
    }
  };

  render() {
    const { events } = this.state;
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
