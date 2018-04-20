import secrets from './secrets';

export function createProject(name, id) {
  return { name, id };
}

export default {
  gitlab: {
    projects: secrets.projects
  }
};
