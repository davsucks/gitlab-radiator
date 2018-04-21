/**
 * @jest-environment node
 */
/* eslint-disable no-console */

import fetch from 'node-fetch';
import { fetchLatestPipelines } from '../main/services';
import json from './json/examplePipelineResponse.json';

jest.mock('node-fetch', () => jest.fn());
jest.mock('../config.json', () => ({
  parentDomain: 'mockParentDomain',
  accessToken: 'mockAccessToken'
}));

describe('services', () => {
  const id = 'mockProjectId';
  const url = `https://gitlab.mockParentDomain.com/api/v4/projects/${id}/pipelines`;
  const headers = {
    'Private-Token': 'mockAccessToken'
  };
  const response = {
    json() {
      return json;
    }
  };

  describe('fetchLatestPipelines', () => {
    test('fetches only the latest pipeline when no refs are configured', () => {
      fetch.mockResolvedValue(response);

      const latest = [json[0]];

      return fetchLatestPipelines({ id }).then((pipelines) => {
        expect(pipelines).toEqual(latest);
        expect(fetch).toBeCalledWith(url, { headers });
      });
    });

    test('fetches the latest pipeline for each configured ref', () => {
      fetch.mockResolvedValue(response);

      const refs = ['master', 'develop'];
      const latestForDevelop = json[0];
      const latestForMaster = json[1];

      return fetchLatestPipelines({ id, refs }).then((pipelines) => {
        expect(pipelines).toContainEqual(latestForDevelop);
        expect(pipelines).toContainEqual(latestForMaster);
        expect(fetch).toBeCalledWith(url, { headers });
      });
    });

    test('logs errors', () => {
      const e = new Error('oops!');

      jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValue(e);

      return fetchLatestPipelines({ id }).then(() => {
        expect(console.error).toBeCalledWith(e);

        console.error.mockRestore();
      });
    });
  });
});
