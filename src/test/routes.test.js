import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fetchMock from 'fetch-mock';
import { config, routes } from '../main';
import examplePipelineResponse from './examplePipelineResponse';

chai.use(chaiAsPromised);

describe('routes', () => {
  const { projectId } = config.gitlab;

  before(() => {
    fetchMock.get('*', examplePipelineResponse);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  after(() => {
    fetchMock.restore();
  });

  describe('fetchPipelinesForProject', () => {
    it('should have a green master be green', (done) => {
      routes.fetchPipelinesForProject(projectId).then((pipelineData) => {
        const masterHasGreenProject = pipelineData.filter(pipeline => pipeline.ref === 'master')
          .some(pipeline => pipeline.status === 'success');
        expect(masterHasGreenProject).to.equal(true);
        done();
      }).catch(done);
    });

    it('should filter out refs that are not master', (done) => {
      routes.fetchPipelinesForProject(projectId).then((pipelines) => {
        const responseOnlyHasMasterPipelines = pipelines.every(pipeline => pipeline.ref === 'master');
        expect(responseOnlyHasMasterPipelines).to.equal(true);
        done();
      }).catch(done);
    });
  });
});
