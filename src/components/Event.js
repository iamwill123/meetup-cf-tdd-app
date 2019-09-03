import React, { Component } from 'react';

// FEATURE 2: SHOW/HIDE AN EVENT DETAILS
// Scenario 1: An event element is collapsed by default.
// Scenario 2: User can expand an event to see its details.
// Scenario 3: User can collapse an event to hide its details.
export class Event extends Component {
  state = {
    show: false
  };

  handleItemClick = () => {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  };
  render() {
    const { event } = this.props;
    const { show } = this.state;

    if (!event) return <div>Loading...</div>;

    return (
      <div className="Event">
        <div className="name">Event: {event.name}</div>
        <button className="details-btn" onClick={this.handleItemClick}>
          {!show ? 'Details' : 'Hide'}
        </button>
        {show && (
          <div className="detail-info">
            <div className="event-yes_rsvp_count">
              Venue: {event.venue && event.venue.name}
            </div>
            <div className="event-local_date">Date: {event.local_date}</div>
            <div className="going">RSVP: {event.yes_rsvp_count}</div>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
            >
          </div>
        )}
      </div>
    );
  }
}

export default Event;
