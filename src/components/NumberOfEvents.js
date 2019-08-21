import React, { Component } from 'react';
// import { suggestionsData } from '../mock-data/MockData';

class NumberOfEvents extends Component {
  state = {
    query: ''
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  render() {
    const { query } = this.state;
    const { events } = this.props;
    return (
      <div className="NumberOfEvents">
        Show{' '}
        <input
          type="text"
          className="number-of-events"
          value={events.length}
          onChange={this.handleInputChange}
        />{' '}
        Events
      </div>
    );
  }
}

export default NumberOfEvents;
