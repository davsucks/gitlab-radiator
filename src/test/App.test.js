/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { App, Project } from '../main';

describe.only('<App />', () => {
  const projects = [{ name: 'Test Project', id: '1234' }, { name: 'Second project', id: '3456' }];
  let wrapper;

  beforeEach(() => wrapper = shallow(<App projects={projects} />));

  test('renders the first <Project/> with the name and id', () => {
    expect(wrapper.contains(<Project project={projects[0]} />)).toBeTruthy();
  });

  test('renders one <Project/> for each project', () => {
    expect(wrapper.find(Project).length).toBe(2);
  });

  test('renders the second <Project/> with props', () => {
    expect(wrapper.contains(<Project project={projects[1]} />)).toBeTruthy();
  });

  test('renders the projects in a wrapper div', () => {
    expect(wrapper.find('.wrapper').length).toBe(1);
  });
});
