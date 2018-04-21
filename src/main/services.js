/* eslint-disable no-console, no-confusing-arrow */

import fetch from 'node-fetch';
import config from '../config.json';

const { accessToken, parentDomain } = config;
const baseUrl = `https://gitlab.${parentDomain}.com/api/v4`;
const headers = { headers: { 'Private-Token': accessToken } };

export function fetchLatestPipelines({ id, refs }) {
  return fetch(`${baseUrl}/projects/${id}/pipelines`, headers)
    .then(res => res.json())
    .then(pipelines => refs
      ? refs.map(ref => pipelines.filter(pipeline => pipeline.ref === ref))
      : [pipelines])
    .then(groupedByRef => groupedByRef.map(group => group[0]))
    .catch(console.error);
}

export default fetchLatestPipelines;
