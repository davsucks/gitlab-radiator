import 'babel-polyfill';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/resources/secrets.properties') });
dotenv.config({ path: path.join(__dirname, '/resources/environment.properties') });

export default {
  secretKey: process.env.SECRET_KEY,
  publicKey: process.env.PUBLIC_KEY,
  gitlab: {
    accessToken: process.env.GITLAB_ACCESS_TOKEN,
    parentDomain: process.env.GITLAB_PARENT_DOMAIN,
  }
};
