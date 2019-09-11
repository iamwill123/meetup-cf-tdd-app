import React, { Component } from 'react';
// import { suggestionsData } from '../mock-data/MockData';
import { ErrorAlert } from './Alert';

// FEATURE 3: SPECIFY NUMBER OF EVENTS
// Scenario 1: When user hasn’t specified a number, 32 is the default number.
// Scenario 2: User can change the number of events they want to see.
class NumberOfEvents extends Component {
  state = {
    number: 32, // 32 is the default
    errorText: ''
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ number: value });
    if (value < 1) {
      this.setState({
        errorText: 'The number of events shown must be 1 or more'
      });
    } else {
      this.props.updateEvents(null, null, value);
      this.setState({ errorText: '' });
    }
  };

  render() {
    const { number, errorText } = this.state;

    return (
      <>
        <div className="NumberOfEvents">
          Show{' '}
          <input
            type="number"
            className="number-of-events"
            value={number}
            onChange={this.handleInputChange}
          />{' '}
          Events
        </div>
        <ErrorAlert text={errorText} />
      </>
    );
  }
}

export default NumberOfEvents;
