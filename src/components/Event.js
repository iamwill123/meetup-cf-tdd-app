import React, { Component } from 'react';

export class Event extends Component {
  render() {
    const { event } = this.props;
    return <div>{event.id}</div>;
  }
}

export default Event;
