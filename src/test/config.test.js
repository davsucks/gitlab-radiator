import { expect } from 'chai';
import { config } from '../main';

describe('config', () => {

  describe('gitlab configuration', () => {
    const gitlabConfiguration = ['projectId', 'accessToken', 'parentDomain', 'projectName'];

    it('exposes necessary configuration', () => {
      expect(config.gitlab).to.have.keys(gitlabConfiguration);
    });

    it('has actual values for each configuration key', () => {
      gitlabConfiguration.forEach((key) => {
        expect(config.gitlab[key]).to.not.be.undefined;
      })
    })
  });

  it('exposes a public configuration', () => {
    expect(config.publicKey).to.equal('public value');
  });
});
