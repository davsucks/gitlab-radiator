import chai, { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import examplePipelineResponse from './examplePipelineResponse';
import exampleJobsResponse from './exampleJobsResponse';

chai.use(chaiAsPromised);

describe('routes', () => {
  const projectId = '1234';

  describe('fetchPipelinesForProject', () => {
    const fetchMock = sinon.stub()
      .resolves({ json: () => Promise.resolve(examplePipelineResponse) });
    const routes = proxyquire('../main/routes', { 'node-fetch': fetchMock });

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

  describe('fetchJobsForProject', () => {
    const fetchMock = sinon.stub()
      .resolves({ json: () => Promise.resolve(exampleJobsResponse) });
    const routes = proxyquire('../main/routes', { 'node-fetch': fetchMock });

    it('filters out only the master branches', (done) => {
      routes.fetchJobsForProject(projectId).then((jobs) => {
        const responseOnlyHasMasterPipelines = jobs.every(job => job.pipeline.ref === 'master');
        expect(responseOnlyHasMasterPipelines).to.equal(true);
        done();
      }).catch(done);
    });
  });

  describe('fetchMostRecentCommitForProject', () => {
    const fetchMock = sinon.stub()
      .resolves({ json: () => Promise.resolve(exampleJobsResponse) });
    const routes = proxyquire('../main/routes', { 'node-fetch': fetchMock });

    it('returns a commit with the expected schema', (done) => {
      routes.fetchMostRecentCommitForProject(projectId).then((commit) => {
        expect(commit).to.have.keys(
          'author_email',
          'author_name',
          'created_at',
          'id',
          'message',
          'short_id',
          'title'
        );
        done();
      }).catch(done);
    });
  });

  describe('getMasterPipelineStatusWithCommit', () => {
    const fetchMock = sinon.stub()
      .onFirstCall()
      .resolves({ json: () => Promise.resolve(examplePipelineResponse) })
      .onSecondCall()
      .resolves({ json: () => Promise.resolve(exampleJobsResponse) });
    const routes = proxyquire('../main/routes', { 'node-fetch': fetchMock });

    it('returns a commit with the expected schema', (done) => {
      routes.getMasterPipelineStatusWithCommit(projectId).then((commit) => {
        expect(commit).to.have.keys(
          'id',
          'status',
          'ref',
          'sha',
          'commit'
        );
        done();
      }).catch(done);
    });
  });
});
