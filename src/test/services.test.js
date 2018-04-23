/**
 * @jest-environment node
 */
/* eslint-disable no-console */

import fetch from 'node-fetch';
import { fetchLatestPipelinesWithCommits } from '../main/services';
import pipelinesJson from './json/examplePipelineResponse.json';
import jobsJson from './json/exampleJobsResponse.json';
import { buildMockResponse } from './testHelpers';

jest.mock('node-fetch', () => jest.fn());
jest.mock('../config.json', () => ({
  parentDomain: 'mockParentDomain',
  accessToken: 'mockAccessToken'
}));

describe('services', () => {
  const refs = ['master', 'develop'];
  const latestPipelineOverall = pipelinesJson[0];
  const latestPipelineForDevelop = pipelinesJson[0];
  const latestPipelineForMaster = pipelinesJson[1];
  const { commit } = jobsJson[0];
  const projectId = 'mockProjectId';
  const pipelineUrl = `https://gitlab.mockParentDomain.com/api/v4/projects/${projectId}/pipelines`;
  const buildJobsUrl = ({ id: pipelineId }) =>
    `https://gitlab.mockParentDomain.com/api/v4/projects/${projectId}/pipelines/${pipelineId}/jobs`;
  const headers = { 'Private-Token': 'mockAccessToken' };

  describe('fetchLatestPipelines', () => {
    test('fetches only the latest pipeline when no refs are configured', () => {
      fetch.mockResolvedValueOnce(buildMockResponse(pipelinesJson));
      fetch.mockResolvedValueOnce(buildMockResponse(jobsJson));

      const jobsUrl = buildJobsUrl(latestPipelineOverall);
      const latestOverall = {
        ...latestPipelineOverall,
        commit
      };

      return fetchLatestPipelinesWithCommits({ id: projectId })
        .then((pipelinesWithCommits) => {
          expect(pipelinesWithCommits).toContainEqual(latestOverall);
          expect(pipelinesWithCommits).toHaveLength(1);
          expect(fetch).toBeCalledWith(pipelineUrl, { headers });
          expect(fetch).toBeCalledWith(jobsUrl, { headers });
        });
    });

    test('fetches the latest pipeline for each configured ref', () => {
      fetch.mockResolvedValueOnce(buildMockResponse(pipelinesJson));
      fetch.mockResolvedValueOnce(buildMockResponse(jobsJson));
      fetch.mockResolvedValueOnce(buildMockResponse(jobsJson));

      const jobsUrlForDevelop = buildJobsUrl(latestPipelineForDevelop);
      const jobsUrlForMaster = buildJobsUrl(latestPipelineForMaster);
      const latestForDevelop = {
        ...latestPipelineForDevelop,
        commit
      };
      const latestForMaster = {
        ...latestPipelineForMaster,
        commit
      };

      return fetchLatestPipelinesWithCommits({ id: projectId, refs })
        .then((pipelinesWithCommits) => {
          expect(pipelinesWithCommits).toContainEqual(latestForDevelop);
          expect(pipelinesWithCommits).toContainEqual(latestForMaster);
          expect(pipelinesWithCommits).toHaveLength(2);
          expect(fetch).toBeCalledWith(pipelineUrl, { headers });
          expect(fetch).toBeCalledWith(jobsUrlForDevelop, { headers });
          expect(fetch).toBeCalledWith(jobsUrlForMaster, { headers });
        });
    });

    test('strips out any pipelines that have no latest run', () => {
      fetch.mockResolvedValueOnce(buildMockResponse([latestPipelineForDevelop]));
      fetch.mockResolvedValueOnce(buildMockResponse(jobsJson));

      const latestForDevelop = {
        ...latestPipelineForDevelop,
        commit
      };

      return fetchLatestPipelinesWithCommits({ id: projectId, refs })
        .then((pipelinesWithCommits) => {
          expect(pipelinesWithCommits).toContainEqual(latestForDevelop);
          expect(pipelinesWithCommits).toHaveLength(1);
          expect(fetch).toBeCalledWith(pipelineUrl, { headers });
        });
    });

    test('logs errors', () => {
      const e = new Error('oops!');

      jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValue(e);

      return fetchLatestPipelinesWithCommits({ id: projectId }).then(() => {
        expect(console.error).toBeCalledWith(e);

        console.error.mockRestore();
      });
    });
  });
});
