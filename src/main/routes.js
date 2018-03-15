import fetch from 'node-fetch';
import config from './config';

const { accessToken, parentDomain } = config.gitlab;
const url = `https://gitlab.${parentDomain}.com/api/v4/`;

const headers = { headers: { 'Private-Token': accessToken } };

function fetchProject(projectId) {
  return fetch(`${url}/projects/${projectId}`, headers)
    .then(res => res.json());
}

function fetchPipelinesForProject(projectId) {
  return fetch(`${url}/projects/${projectId}/pipelines`, headers)
    .then(res => res.json());
}

export { fetchProject, fetchPipelinesForProject };
