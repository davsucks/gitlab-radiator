/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../main/';

fetch.mockResponse(JSON.stringify({ express: 'Hello World' }));

describe('HelloWorld Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders h1', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to React');
  });
  it('renders p', () => {
    expect(wrapper.update().find('p').text()).toEqual('Hello World');
  });
});
