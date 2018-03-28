import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import examplePipelineResponse from './examplePipelineResponse';

// TODO: clean this up
const fetchMock = sinon.stub().resolves({ json: () => Promise.resolve(examplePipelineResponse) });
const routes = proxyquire('../main/routes', { 'node-fetch': fetchMock });

chai.use(chaiAsPromised);

describe('routes', () => {
  const projectId = '1234';

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
