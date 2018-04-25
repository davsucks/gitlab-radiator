# gitlab-radiator

It's exactly what it sounds like 🤷

![screenshot](public/screenshot.png)

## Setup:
* Clone the repo
* Install [yarn](https://yarnpkg.com/en/)
* `yarn`
* `yarn test`
* Don't panic! You're missing configuration, so the tests should fail
  * Create a `config.json` file in `<repo root>/src`
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
  * 🏀 Pending (orange)
  * 📘 Running (blue)
  * 🍇 Skipped (purple)
  * ⚫ Canceled (black)
  * 🌚 Manual (grey)
  * 💚 Success (green)
  * 🍎 Failed (red)
* Note that the difference betwen `manual` and `skipped` is currently unclear. On the Gitlab web UI, both statuses are possible for pipelines in which all jobs have succeeded except for those configured as `manual` in the `.gitlab-ci.yml`. However, the Gitlab API (which this radiator uses) seems to return `suceeded` for pipelines that the web UI considers `skipped`, and `manual` for pipelines the web UI considers `manual`.

## TODO:
* What is the difference betwen `manual` and `skipped`?!
* Don't force users to save their token to disk. Dynamically grab it from the environment somehow.
* Responsive styling needs a lot of love
  * Colors should always stretch to fill project
  * Project name should have more padding
  * Wrap text and respond to window size properly
* Fetch latest pipeline for a specific branch (in case a desired branch hasn't had a pipeline run in a while and doesn't come page in the paginated generic GET for all pipelines)
* Add option to highlight cross-project related commits based on commit message
* Clean up unused stuff from `create-react-app`
* Graceful degradation in case commit info is not available (can still display pipeline)
* Make fetch interval configurable
* Show commiter's avatar?