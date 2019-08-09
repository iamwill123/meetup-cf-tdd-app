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
      <div className="event">
        <div className="event-name">{event.name_string}</div>
        <button className="detail-btn" onClick={this.handleItemClick}>
          Details
        </button>
        {show && (
          <div className="detail-info">
            <div className="event-city">{event.city}</div>
            <div className="event-country">{event.country}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
