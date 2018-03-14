import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { config, routes } from '../main';

chai.use(chaiAsPromised);

describe('routes', () => {
  const { projectId, projectName } = config.gitlab;

  describe('fetchProject', () => {
    it('returns the project name', () => {
      const projectData = routes.fetchProject(projectId);
      return expect(projectData)
        .to.eventually.have.property('name')
        .that.is.equal(projectName);
    });
  });

  xdescribe('fetchPipelinesForProject', () => {
    it('', () => {
      const projectData = routes.fetchPipelinesForProject();
      return expect(projectData)
        .to.eventually.have.property('name')
        .that.is.equal(projectName);
    });
  });
});
