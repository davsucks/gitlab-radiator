/*
 * @jest-environment node
*/
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import config from '../config.json';

const { projects, accessToken, parentDomain } = config;

describe('config', () => {
  it('has at least one project in it', () => {
    expect(projects.length).to.be.at.least(1);
  });

  it('accessToken is present', () => {
    expect(accessToken).to.not.be.undefined;
  });

  it('parentDomain is present', () => {
    expect(parentDomain).to.not.be.undefined;
  });

  describe('the shape and content of a project', () => {
    let project;

    beforeEach(() => {
      [project] = projects;
    });

    it('has the right shape (name and id)', () => {
      expect(project).to.have.keys(['name', 'id']);
    });

    it('actually contains information', () => {
      expect(project.name).to.not.be.undefined;
      expect(project.id).to.not.be.undefined;
    });
  });
});
