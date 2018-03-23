/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { App, Project } from '../main';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    const projects = [{ name: 'Test Project', id: '1234' }, { name: 'Second project', id: '3456'}];
    wrapper = shallow(<App projects={ projects }/>);
  });

  it.only('renders the first <Project/> with the name and id', () => {
    expect(wrapper.contains(<Project name={'Test Project'} id={'1234'} />)).to.equal(true);
  });

  it('renders one <Project/> for each project', () => {
    expect(wrapper.find(Project).length).to.equal(2);
  });

  it('renders the second <Project/> with attributes', () => {
    expect(wrapper.contains(<Project name={'Second Project'} id={'3456'} />)).to.equal(true);
  })
});