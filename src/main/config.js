import 'babel-polyfill';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/resources/secrets.properties') });

export default {
  accessToken: process.env.GITLAB_ACCESS_TOKEN,
  parentDomain: process.env.GITLAB_PARENT_DOMAIN,
};
