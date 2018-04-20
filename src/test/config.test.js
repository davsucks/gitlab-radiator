/*
 * @jest-environment node
*/
/* eslint-disable no-unused-expressions */

import config from '../config.json';

const { projects, accessToken, parentDomain } = config;

describe('config', () => {
  test('has at least one project in it', () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
  });

  test('accessToken is present', () => {
    expect(accessToken).not.toBeUndefined();
  });

  test('parentDomain is present', () => {
    expect(parentDomain).not.toBeUndefined();
  });

  describe('the shape and content of a project', () => {
    const [project] = projects;

    test('has the right shape (name and id)', () => {
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('id');
    });

    test('actually contains information', () => {
      expect(project.name).not.toBeUndefined();
      expect(project.id).not.toBeUndefined();
    });
  });
});
