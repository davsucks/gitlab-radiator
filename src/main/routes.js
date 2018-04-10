import fetch from 'node-fetch';
import config from './config';

const { accessToken, parentDomain } = config.gitlab;
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

export { fetchPipelinesForProject, fetchJobsForProject };
