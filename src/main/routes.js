import fetch from 'node-fetch';
import { accessToken, parentDomain } from './config';

export const url = `https://gitlab.${parentDomain}.com/api/v4`;

const headers = { headers: { 'Private-Token': accessToken } };

function fetchPipelinesForProject(projectId) {
  return fetch(`${url}/projects/${projectId}/pipelines`, headers)
    .then(res => res.json())
    .then(pipelines => pipelines.filter(pipeline => pipeline.ref === 'master'))
    .catch(console.error);
}

function fetchJobsForProject(projectId) {
  return fetch(`${url}/projects/${projectId}/jobs`, headers)
    .then(res => res.json())
    .then(jobs => jobs.filter(job => job.pipeline.ref === 'master'))
    .catch(console.error);
}

function fetchMostRecentCommitForProject(projectId) {
  return fetchJobsForProject(projectId).then(jobs => jobs[0].commit);
}

async function getMasterPipelineStatusWithCommit(projectId) {
  const pipelines = await fetchPipelinesForProject(projectId);
  const commit = await fetchMostRecentCommitForProject(projectId);
  return Object.assign({}, pipelines[0], { commit });
}

export {
  fetchPipelinesForProject,
  fetchJobsForProject,
  fetchMostRecentCommitForProject,
  getMasterPipelineStatusWithCommit
};
