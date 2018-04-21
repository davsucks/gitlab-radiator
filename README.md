# gitlab-radiator

It's exactly what it sounds like 🤷

## Setup:
* Clone the repo
* Install [yarn](https://yarnpkg.com/en/)
* `yarn`
* `yarn test`
* Don't panic! You're missing configuration, so the tests should fail
  * Create a `config.json` file in `<repo root>/main`
  * The failing tests should guide you in generating the correct config
  ```JSON
    {
      "accessToken": "string",
      "parentDomain": "string",
      "projects": [
        {
          "id": "string",
          "name": "string"
        }
      ]
    }

  ```
  * Rerun `yarn test`
  * This time they should pass
* `yarn start`

## TODO:
* If any single pipeline is red, make the background bright red
* Dynamically allocate real estate based on if the project is red or green (bigger if red)
* Make branches shown configurable (i.e. not just master)
* Fetch latest pipeline for a specific branch (in case a desired branch hasn't had a pipeline run in a while and doesn't come page in the paginated generic GET for all pipelines)
* Display commit message, committer's name (may require fetching more info for given pipeline/job)
* Add option to highlight cross-project related commits based on commit message
* Clean up unused stuff from `create-react-app`
* Clear fetch interval in `<Project />` to prevent memory leaks
* Integrate David's WIP
