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
  * `<project dir>/client/secrets.js`
* For populating `secrets.properties` see [this section](#populating-`secrets.properties`)
* For populating `secrets.js` see [this section](#populating-`secrets.js`)
* `$yarn test`
* This time they should pass
* `$yarn dev`

### Populating `secrets.properties`
* Refer to the broken tests from the previous run and fix them one by one

### Populating `secrets.js`
* Again, refer to the broken tests in the client directory and fix them one by one
* `config.js` exposes a function called `createProject` that takes a gitlab project name and id
* Use `createProject` in `secrets.js` to build up a list of projects to display until the tests are green and your radiator is radiant

## TODO:
* Allow multiple project ids and display accordingly
* Mention how to get a gitlab access token
* Refresh projects every 10 seconds (todo: rate limits?)
* Remove superfluous backend. Make api calls in react
* Figure out react/prop-types eslint validation
* Automate first-time setup?
