import axios from 'axios';
import { returnedSuggestionsData } from './mock-data/mock-locations';
import { mockEvents } from './mock-data/mock-events';

const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  console.log('TCL: getAccessToken -> accessToken', accessToken);

  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (!code) {
      window.location.href =
        'https://secure.meetup.com/oauth2/authorize?client_id=j12j4mvc0gjql1p5is9iu8uib3&response_type=code&redirect_uri=http://iamwill123.github.io/meetup-cf-tdd-app';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  return accessToken;

  async function getOrRenewAccessToken(type, key) {
    let url;
    if (type === 'get') {
      // Lambda endpoint to get token by code
      url =
        'https://w30vudwd4f.execute-api.us-east-1.amazonaws.com/dev/api/token/' +
        key;
    } else if (type === 'renew') {
      // Lambda endpoint to get token by refresh_token
      url =
        'https://w30vudwd4f.execute-api.us-east-1.amazonaws.com/dev/api/refresh/' +
        key;
    }

    // Use Axios to make a GET request to the endpoint
    const tokenInfo = await axios.get(url);

    // Save tokens to localStorage together with a timestamp
    localStorage.setItem('access_token', tokenInfo.data.access_token);
    localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
    localStorage.setItem('last_saved_time', Date.now());

    // Return the access_token
    return tokenInfo.data.access_token;
  }
};

const getSuggestionsData = async query => {
  console.log('TCL: getSuggestionsData');
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
    return result.data;
  }
  return [];
};

const getEvents = async (lat, lon) => {
  console.log('TCL: getEvents -> getEvents');
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
    const result = await axios.get(url);
    return result.data.events;
  }
};

export { getSuggestionsData, getEvents };
