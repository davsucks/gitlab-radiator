import fetch from 'node-fetch';
import config from './config';

const { accessToken, parentDomain } = config.gitlab;
const url = `https://gitlab.${parentDomain}.com/api/v4/`;

function fetchProject(projectId) {
  return fetch(`${url}/projects/${projectId}`, { headers: { 'Private-Token': accessToken } })
    .then(res => res.json());
}

function fetchPipelinesForProject() {
  return 'null';
}

// eslint-disable-next-line import/prefer-default-export
export { fetchProject, fetchPipelinesForProject };
