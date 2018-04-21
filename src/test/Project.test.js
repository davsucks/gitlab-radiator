/**
 * @jest-environment node
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Project } from '../main/';
import * as services from '../main/services';
import { syncPromiseOf } from './testHelpers';

jest.mock('node-fetch', () => jest.fn());
jest.spyOn(services, 'fetchLatestPipeline');
const { fetchLatestPipeline } = services;

describe('<Project />', () => {
  const pipeline = { status: 'succeeded' };
  const props = { name: 'Test Application', id: 'test' };
  const ProjectJsx = <Project {...props} />;

  beforeEach(() => {
    fetchLatestPipeline.mockImplementation(() => syncPromiseOf(pipeline));
  });

  afterAll(() => jest.resetAllMocks());

  test('renders the project name', () => {
    const wrapper = shallow(ProjectJsx, { disableLifecycleMethods: true });

    expect(wrapper.find('h1').text()).toBe('Test Application');
  });

  it('regularly fetches data', () => {
    const intervalId = 'mockTimeoutId';
    jest.useFakeTimers();
    setInterval.mockReturnValue(intervalId);

    const wrapper = mount(ProjectJsx);

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 10000);
    expect(fetchLatestPipeline).toHaveBeenCalledWith(props.id);

    wrapper.unmount();

    expect(clearInterval).toHaveBeenCalledWith(intervalId);
  });

  xit('handles multiple branches if configured', () => {
    // TODO
  });
});
