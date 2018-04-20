import 'babel-polyfill';
import { expect } from 'chai';
import { config } from '../main';

const expectedKeys = ['accessToken', 'parentDomain'];

describe('config', () => {
  it('is an object', () => {
    expect(config).to.be.an('object');
  });

  it('has the necessary keys for the application to work', () => {
    expect(config).to.have.keys(expectedKeys);
  });

  it('has actual values for each configuration key', () => {
    expectedKeys.forEach((key) => {
      expect(config[key]).to.not.be.undefined;
    });
  });
});
