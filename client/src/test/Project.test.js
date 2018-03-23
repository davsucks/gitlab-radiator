/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Project } from '../main/';

fetch.mockResponse(JSON.stringify({ express: 'Hello World' }));

describe('<Project />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Project name={'Test Application'}/>, { disableLifecycleMethods: true });
  });

  it('renders the project name', () => {
    expect(wrapper.find('h1').text()).to.equal('Test Application');
  });
  it('renders a pipeline', () => {
    expect(wrapper.update().find('Pipelines').length).to.equal(1);
  });
});