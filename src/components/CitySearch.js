import React, { Component } from 'react';
import { getSuggestionsData } from '../api/api';

// FEATURE 1: FILTER EVENTS BY CITY
// Scenario 1: By default, when user hasn’t searched for a city, show upcoming events based on the user’s location.
// Scenario 2: User should see a list of suggestions when they search for a city.
// Scenario 3: User can select a city from the suggested list.
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

  handleItemClicked = (value, lat, lon) => {
    this.setState({
      query: value,
      suggestions: []
    });
    this.props.updateEvents(lat, lon);
  };

  render() {
    const { query, suggestions } = this.state;
    if (!suggestions) return 'loading suggestions...';

    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          placeholder="City"
          value={query}
          onChange={this.handleInputChange}
        />
        <ul className="suggestions">
          {suggestions.map(item => {
            const { name_string, zip, lat, lon } = item;
            return (
              <li
                key={zip}
                onClick={() => this.handleItemClicked(name_string, lat, lon)}
              >
                {name_string}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
