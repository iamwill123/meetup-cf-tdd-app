'use strict';

const axios = require('axios');

module.exports.getAccessToken = async event => {
  console.log('TCL: event', event);
  const MEETUP_OAUTH_URL =
    'https://secure.meetup.com/oauth2/access' +
    '?client_id=j12j4mvc0gjql1p5is9iu8uib3' +
    '&client_secret=3mqf089ejhk03nvikdr45702om' +
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
