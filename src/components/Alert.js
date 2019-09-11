import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color
    };
  };

  render() {
    const { text } = this.props;
    if (text) {
      return (
        <div className="Alert">
          <p style={this.getStyle()}>{text}</p>
        </div>
      );
    }
    return null;
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

export { InfoAlert };
