# Tutor / Mentor CF version

## To test serverless function locally

Example:
- Obtain `code` from redirect: `https://secure.meetup.com/oauth2/authorize?client_id=j12j4mvc0gjql1p5is9iu8uib3&response_type=code&redirect_uri=http://iamwill123.github.io/meetup-cf-tdd-app`

In terminal:
- for getAccessToken(), run: `serverless invoke local --function getAccessToken --data '{"pathParameters": { "code": "6af9241cc444c7803141b2974aa0a79f" }}'`

- for getRefreshAccessToken() run: `serverless invoke local --function getRefreshAccessToken --data '{"pathParameters": { "code": "11e160a99646020cf5f274f84bec3018" }}'`

References:
- https://serverless-stack.com/chapters/load-secrets-from-env-yml.html