import { expect } from 'chai';
import { config } from '../main';

describe('config', () => {
  it('exposes a secret configuration', () => {
    expect(config.secretKey).to.equal('secret value');
  });

  it('exposes a public configuration', () => {
    expect(config.publicKey).to.equal('public value');
  });
});
