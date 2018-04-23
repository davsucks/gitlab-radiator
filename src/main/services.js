/* eslint-disable no-console, no-confusing-arrow, no-use-before-define, function-paren-newline */

import fetch from 'node-fetch';
import config from '../config.json';

const { accessToken, parentDomain } = config;
const baseUrl = `https://gitlab.${parentDomain}.com/api/v4`;
const headers = { headers: { 'Private-Token': accessToken } };

export const fetchLatestPipelinesWithCommits = ({ id: projectId, refs }) =>
  fetchPipelines(projectId)
    .then(pipelines => refs
      ? selectLatestPipelinePerRef(projectId, refs, pipelines)
      : selectLatestPipelineOverall(projectId, pipelines))
    .then(pipelines => pipelines.filter(pipeline => Boolean(pipeline)))
    .then(pipelines => Promise.all(pipelines
      .map(pipeline => combineWithLatestCommit(projectId, pipeline))))
    .catch(console.error);

const selectLatestPipelinePerRef = (projectId, refs, pipelines) =>
  refs
    .map(ref => pipelines.filter(pipeline => pipeline.ref === ref))
    .map(pipelinesForRef => pipelinesForRef[0]);

const selectLatestPipelineOverall = (projectId, pipelines) => [pipelines[0]];

const combineWithLatestCommit = (projectId, pipeline) =>
  fetchJobsForPipeline(projectId, pipeline)
    .then(jobs => jobs[0])
    .then(({ commit }) => ({ ...pipeline, commit }));
  // TODO: catch and return pipeline

const fetchPipelines = projectId => fetch(
  `${baseUrl}/projects/${projectId}/pipelines`, headers)
  .then(res => res.json());

const fetchJobsForPipeline = (projectId, pipeline) => fetch(
  `${baseUrl}/projects/${projectId}/pipelines/${pipeline.id}/jobs`, headers)
  .then(res => res.json());

export default fetchLatestPipelinesWithCommits;
