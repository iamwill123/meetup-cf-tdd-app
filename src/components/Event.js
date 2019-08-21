import React, { Component } from 'react';

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
              Venue: {event.venue.name}
            </div>
            <div className="event-local_date">Date: {event.local_date}</div>
            <div className="going">RSVP: {event.yes_rsvp_count}</div>
            <div className="description">Desc: {event.description}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
