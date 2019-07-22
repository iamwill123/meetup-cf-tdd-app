'use strict';

const axios = require('axios');

const meetupClientId = 'j12j4mvc0gjql1p5is9iu8uib3';
const meetupClientSecret = '3mqf089ejhk03nvikdr45702om';
module.exports.getAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    'https://secure.meetup.com/oauth2/access' +
    '?client_id=' +
    meetupClientId +
    '&client_secret=' +
    meetupClientSecret +
    '&grant_type=authorization_code' +
    '&redirect_uri=http://iamwill123.github.io/meetup-cf-tdd-app' +
    '&code=' +
    event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};

module.exports.getRefreshAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    'https://secure.meetup.com/oauth2/access' +
    '?client_id=' +
    meetupClientId +
    '&client_secret=' +
    meetupClientSecret +
    '&grant_type=refresh_token' +
    '&refresh_token=' +
    event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};
