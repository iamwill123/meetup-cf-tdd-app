import React, { Component } from 'react';
// import { suggestionsData } from '../mock-data/MockData';

// FEATURE 3: SPECIFY NUMBER OF EVENTS
// Scenario 1: When user hasn’t specified a number, 32 is the default number.
// Scenario 2: User can change the number of events they want to see.
class NumberOfEvents extends Component {
  state = {
    number: 32 // 32 is the default
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
  };

  render() {
    const { number } = this.state;

    return (
      <div className="NumberOfEvents">
        Show{' '}
        <input
          type="text"
          className="number-of-events"
          value={number}
          onChange={this.handleInputChange}
        />{' '}
        Events
      </div>
    );
  }
}

export default NumberOfEvents;
