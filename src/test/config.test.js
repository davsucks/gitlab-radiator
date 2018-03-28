import { expect } from 'chai';
import { config } from '../main';

describe('config', () => {
  it('is an object', () => {
    expect(config).to.be.an('object');
  });

  it('has a gitlab key', () => {
    expect(config).to.have.property('gitlab');
  });

  describe('gitlab', () => {
    const gitlabConf = config.gitlab;

    it('is an object', () => {
      expect(gitlabConf).to.be.an('object');
    });

    const expectedKeys = ['accessToken', 'parentDomain'];

    it('has the necessary keys for the application to work', () => {
      expect(gitlabConf).to.have.keys(expectedKeys);
    });

    it('has actual values for each configuration key', () => {
      expectedKeys.forEach((key) => {
        expect(gitlabConf[key]).to.not.be.undefined;
      });
    });
  });
});
