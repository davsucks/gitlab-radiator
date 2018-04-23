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
  * The `refs` field is optional. If you set it, the latest pipeline for every git branch in your repo will be shown. If you don't, we'll just show the lastest pipeline that ran, regardless of branch.
  ```JSON
    {
      "accessToken": "string",
      "parentDomain": "string",
      "projects": [
        {
          "id": "string",
          "name": "string",
          "refs": [
            "master",
            "develop"
          ]
        }
      ]
    }

  ```
  * Rerun `yarn test`
  * This time they should pass
* `yarn start`

## Key
* The monitor always shows the latest **pipeline** (not job!) for the configured refs (branches).
* If no refs are configured, it shows the latest pipeline overall
* A pipeleline can be in the following states:
  * <span style="color: white; background-color: orange;">Pending</span>
  * <span style="color: white; background-color: blue;">Running</span>
  * <span style="color: white; background-color: purple;">Skipped</span>
  * <span style="color: white; background-color: black;">Canceled</span>
  * <span style="color: white; background-color: green;">Success</span>
  * <span style="color: white; background-color: red;">Failed</span>

## TODO:
* Don't force users to save their token to disk. Dynamically grab it from the environment somehow.
* Dynamically allocate real estate based on if the project is red or green (bigger if red)
* Fetch latest pipeline for a specific branch (in case a desired branch hasn't had a pipeline run in a while and doesn't come page in the paginated generic GET for all pipelines)
* Add option to highlight cross-project related commits based on commit message
* Clean up unused stuff from `create-react-app`
* Graceful degradation in case commit info is not available (can still display pipeline)
* Make fetch interval configurable
* Show commiter's avatar?