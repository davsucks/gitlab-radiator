/**
 * @jest-environment node
 */

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
    it('is an object', () => {
      expect(config.gitlab).to.be.an('object');
    });

    it('has a projects key', () => {
      expect(config.gitlab).to.have.key('projects');
    });

    describe('projects', () => {
      it('is an array', () => {
        expect(config.gitlab.projects).to.be.an('array');
      });

      it('has at least one project in it', () => {
        const { projects } = config.gitlab;
        expect(projects.length).to.be.at.least(1);
      });

      describe('the shape and content of a project', () => {
        let project;

        beforeEach(() => {
          project = config.gitlab.projects[0];
        });

        it('has the right shape (name and id)', () => {
          expect(project).to.have.keys(['name', 'id'])
        });

        it('actually contains information', () => {
          expect(project.name).to.not.be.undefined;
          expect(project.id).to.not.be.undefined;
        });
      });
    });
  });
});
