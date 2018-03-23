/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { App } from '../main/';

fetch.mockResponse(JSON.stringify({ express: 'Hello World' }));

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App projectName={'Test Application'}/>, { disableLifecycleMethods: true });
  });

  it('renders the project name', () => {
    expect(wrapper.find('h1').text()).to.equal('Test Application');
  });
  it('renders a pipeline', () => {
    expect(wrapper.update().find('Pipelines').length).to.equal(1);
  });
});
