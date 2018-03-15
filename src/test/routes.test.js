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

  describe('fetchPipelinesForProject', () => {
    it('should have a green master be green', (done) => {
      routes.fetchPipelinesForProject(projectId).then((pipelineData) => {
        const masterHasGreenProject = pipelineData.filter((pipeline) => pipeline.ref === 'master')
          .some(pipeline => pipeline.status === 'success');
        expect(masterHasGreenProject).to.equal(true);
        done();
      }).catch(done);
    });
  });
});
