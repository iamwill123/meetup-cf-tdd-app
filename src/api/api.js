import axios from 'axios';
import { returnedSuggestionsData } from './mock-data/mock-locations';
import { mockEvents } from './mock-data/mock-events';

const tokenURL =
  'https://w30vudwd4f.execute-api.us-east-1.amazonaws.com/dev/api/token/';
const renewURL =
  'https://w30vudwd4f.execute-api.us-east-1.amazonaws.com/dev/api/refresh/';

async function getOrRenewAccessToken(type, key) {
  let url;
  try {
    if (type === 'get') {
      // Lambda endpoint to get token by code
      url = tokenURL + key;
    } else if (type === 'renew') {
      // Lambda endpoint to get token by refresh_token
      url = renewURL + key;
    }
    // Use Axios to make a GET request to the endpoint
    const tokenInfo = await axios.get(url);
    console.log('TCL: getOrRenewAccessToken -> tokenInfo', tokenInfo);

    let accessToken = tokenInfo.data.access_token;
    let refreshToken = tokenInfo.data.refresh_token;

    // Save tokens to localStorage together with a timestamp
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('last_saved_time', Date.now()); // returns milliseconds

    // Return the access_token
    return accessToken;
  } catch (error) {
    console.log('TCL: getOrRenewAccessToken -> error', error);
  }
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  try {
    if (!accessToken) {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (!code) {
        window.location.href =
          'https://secure.meetup.com/oauth2/authorize?client_id=j12j4mvc0gjql1p5is9iu8uib3&response_type=code&redirect_uri=https://iamwill123.github.io/meetup-cf-tdd-app';
        return null;
      }
      return await getOrRenewAccessToken('get', code);
    }

    const lastSavedTime = localStorage.getItem('last_saved_time');

    // 3600000 ms = to 1 hour
    if (accessToken && Date.now() - lastSavedTime < 3600000) {
      // The token is valid, return the token and end the function
      return accessToken;
    }
    // If the access_token is expired, we try to renew it by using refresh_token
    const refreshToken = localStorage.getItem('refresh_token');
    return await getOrRenewAccessToken('renew', refreshToken);
  } catch (error) {
    console.log('TCL: getAccessToken -> error', error);
  }
}

async function getSuggestionsData(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return returnedSuggestionsData;
  }

  const token = await getAccessToken();

  if (token) {
    const url =
      'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=' +
      query +
      '&access_token=' +
      token;
    const result = await axios.get(url);
    const suggestions = result.data;

    return suggestions;
  }
  return [];
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }

  const token = await getAccessToken();

  if (token) {
    let url =
      'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public' +
      '&access_token=' +
      token;
    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }
    // page is  optional, if we have page, add it to our url string
    if (page) {
      url += '&page=' + page;
    }

    const result = await axios.get(url);
    const events = result.data.events;
    // for offline use
    if (events.length) {
      // Check if the events exist
      localStorage.setItem('lastEvents', JSON.stringify(events));
    }
    return events;
  }
  return [];
}

export { getSuggestionsData, getEvents };
