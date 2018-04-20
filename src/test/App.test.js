/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Row } from 'reactstrap';
import { App, Project } from '../main';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    const projects = [{ name: 'Test Project', id: '1234' }, { name: 'Second project', id: '3456' }];
    wrapper = shallow(<App projects={projects} />);
  });

  test('renders the first <Project/> with the name and id', () => {
    expect(wrapper.contains(<Project name="Test Project" id="1234" />)).toBeTruthy();
  });

  test('renders one <Project/> for each project', () => {
    expect(wrapper.find(Project).length).toBe(2);
  });

  test('renders the second <Project/> with attributes', () => {
    expect(wrapper.contains(<Project name="Second project" id="3456" />)).toBeTruthy();
  });

  test('renders the projects in a row', () => {
    expect(wrapper.find(Row).length).toBe(1);
  });
});
