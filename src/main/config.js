import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/resources/secrets.properties') });
dotenv.config({ path: path.join(__dirname, '/resources/environment.properties') });

export default {
  secretKey: process.env.SECRET_KEY,
  publicKey: process.env.PUBLIC_KEY,
  gitlab: {
    projectId: process.env.PROJECT_ID,
    accessToken: process.env.GITLAB_ACCESS_TOKEN,
    parentDomain: process.env.GITLAB_PARENT_DOMAIN,
    projectName: process.env.GITLAB_PROJECT_NAME
  }
};
