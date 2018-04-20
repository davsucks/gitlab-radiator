/**
 * @jest-environment node
 */
/* eslint-disable no-console */

import fetch from 'node-fetch';
import { fetchLatestPipeline } from '../main/services';
import json from './json/examplePipelineResponse.json';

jest.mock('node-fetch', () => jest.fn());
jest.mock('../config.json', () => ({
  parentDomain: 'mockParentDomain',
  accessToken: 'mockAccessToken'
}));

describe('services', () => {
  const id = 'mockProjectId';
  const response = {
    json() {
      return json;
    }
  };

  describe('fetchLatestPipeline', () => {
    test('fetches only the latest pipeline for master', () => {
      fetch.mockResolvedValue(response);

      const latestForMaster = json[1];
      const url = `https://gitlab.mockParentDomain.com/api/v4/projects/${id}/pipelines`;
      const headers = {
        'Private-Token': 'mockAccessToken'
      };

      return fetchLatestPipeline(id).then((pipeline) => {
        expect(pipeline).toBe(latestForMaster);
        expect(fetch).toBeCalledWith(url, { headers });
      });
    });

    test('logs errors', () => {
      const e = new Error('oops!');

      jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValue(e);

      return fetchLatestPipeline(id).then(() => {
        expect(console.error).toBeCalledWith(e);

        console.error.mockRestore();
      });
    });
  });
});
