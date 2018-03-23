# Gitlab-radiator

It's exactly what it sounds like

## First time setup:
* Clone the repo
* Install [yarn](https://yarnpkg.com/en/)
* `$yarn`
* `$cd client && yarn`
* `$yarn test`
* Don't panic! You're missing configuration, so the tests should fail
* Create two files:
  * `<project dir>/src/main/resources/secrets.properties`
  * `<project dir>/client/.env`
* For populating `secrets.properties` the tests should be sufficient enough to explain what goes in there, when you're done the tests should pass
* For populating `.env` I didn't write tests specifically for that, but looking at config.js you just need to define two variables:
  * `REACT_APP_GITLAB_PROJECT_NAME`
  * `REACT_APP_GITLAB_PROJECT_ID`
* `$yarn test`
* This time they should pass
* `$yarn dev`

## TODO:
* Mention how to get a gitlab access token
* Allow multiple project ids and display accordingly
* Refresh projects every 10 seconds
* Remove superfluous backend. Make api calls in react
* Figure out react/prop-types eslint validation
* Automate first-time setup?
