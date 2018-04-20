/* eslint-disable no-console */

import fetch from 'node-fetch';
import config from '../config.json';

const { accessToken, parentDomain } = config;
const baseUrl = `https://gitlab.${parentDomain}.com/api/v4`;
const headers = { headers: { 'Private-Token': accessToken } };

export function fetchLatestPipeline(id) {
  return fetch(`${baseUrl}/projects/${id}/pipelines`, headers)
    .then(res => res.json())
    .then(pipelines => pipelines.filter(pipeline => pipeline.ref === 'master'))
    .then(pipelines => pipelines[0])
    .catch(console.error);
}

export default fetchLatestPipeline;
