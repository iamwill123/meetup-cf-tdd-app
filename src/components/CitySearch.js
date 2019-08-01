import React, { Component } from 'react';
// import { suggestionsData } from '../mock-data/MockData';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  handleItemClick = item => {
    this.setState({
      query: item
    });
  };

  render() {
    const { query, suggestions } = this.state;
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={query}
          onChange={this.handleInputChange}
        />
        <ul className="suggestions">
          {suggestions.map(item => (
            <li
              key={item.zip}
              onClick={() => this.handleItemClick(item.name_string)}
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
