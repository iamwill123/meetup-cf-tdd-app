import React, { Component } from 'react';
// import { suggestionsData } from '../mock-data/MockData';

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
