/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Project } from '../main/';

describe('<Project />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Project name="Test Application" id="test" />, {
      disableLifecycleMethods: true
    });
  });

  test('renders the project name', () => {
    expect(wrapper.find('h1').text()).toBe('Test Application');
  });
  // TODO: use nock to stub out projects response
});
