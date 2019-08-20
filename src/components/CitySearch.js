import React, { Component } from 'react';
import { getSuggestionsData } from '../api/mock-data/MockData';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  };

  handleInputChange = event => {
    const query = event.target.value;
    this.setState({ query });
    getSuggestionsData(query).then(suggestions => {
      this.setState({ suggestions });
    });
  };

  handleItemClick = item => {
    this.setState({
      query: item
    });
  };

  render() {
    const { query, suggestions } = this.state;
    if (!suggestions) return 'loading suggestions...';

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
