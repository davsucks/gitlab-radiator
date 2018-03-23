import { expect } from 'chai';
import { config } from '../main';

describe('config', () => {
  describe('gitlab configuration', () => {
    const gitlabConfiguration = ['projectId', 'accessToken', 'parentDomain', 'projectName'];

    it('is an object', () => {
      expect(config.gitlab).to.be.an('object');
    });

    it('has the necessary keys for the application to work', () => {
      expect(config.gitlab).to.have.keys(gitlabConfiguration);
    });

    it('has actual values for each configuration key', () => {
      gitlabConfiguration.forEach((key) => {
        expect(config.gitlab[key]).to.not.be.undefined;
      })
    })
  });
});
