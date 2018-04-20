/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Project } from '../main/';

describe('<Project />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Project name="Test Application" id="test" />, { disableLifecycleMethods: true });
  });

  it('renders the project name', () => {
    expect(wrapper.find('h1').text()).to.equal('Test Application');
  });
  // TODO: use nock to stub out projects response
});
