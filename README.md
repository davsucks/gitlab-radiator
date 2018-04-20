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
* For populating `secrets.properties` and `secrets.js` see the appropriate sections below
* `$yarn test`
* This time they should pass
* `$yarn dev`

### Populating `secrets.properties`
* Refer to the broken tests from the previous run and fix them one by one
* For the `accessToken` this will be an access token supplied by GitLab. You can snag one from your profile settings

### Populating `secrets.js`
* Again, refer to the broken tests in the client directory and fix them one by one
* `config.js` exposes a function called `createProject` that takes a gitlab project name and id
* Use `createProject` in `secrets.js` to build up a list of projects to display until the tests are green and your radiator is radiant

## TODO:
* If any single pipeline is red, make the background bright red
* Dynamically allocate real estate based on if the project is red or green (bigger if red)
* Remove superfluous backend. Make api calls in React.
* Make branches shown configurable (i.e. not just master)
* Fetch lates pipeline for a specific branch (in case a desired branch hasn't had a pipeline run in a while and doesn't come page in the paginated generic GET for all pipelines)
* Remove `secrets.js` and add some sort of project config for everthing except actually secret stuff (API tokens etc)
* Display commit message, committer's name (may require fetching more info for given pipeline/job)
* Add option to highlight cross-project related commits based on commit message\
* Improve README
* Replace `yarn dev` with `yarn start`?
* Clean up unused stuff from `create-react-app`
