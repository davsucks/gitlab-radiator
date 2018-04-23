/**
 * @jest-environment node
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Badge } from 'reactstrap';
import { Project } from '../main/';
import * as services from '../main/services';
import { syncPromiseOf } from './testHelpers';

jest.mock('node-fetch', () => jest.fn());
jest.spyOn(services, 'fetchLatestPipelinesWithCommits');
const { fetchLatestPipelinesWithCommits } = services;

describe('<Project />', () => {
  const pipelines = [
    {
      id: 1,
      status: 'succeeded',
      ref: 'master',
      commit: {
        author_name: 'Jane Doe',
        message: 'Foo'
      }
    },
    {
      id: 2,
      status: 'failed',
      ref: 'develop',
      commit: {
        author_name: 'John Doe',
        message: 'Bar'
      }
    },
  ];

  const props = {
    project: {
      name: 'Test Application',
      id: 'test'
    }
  };

  const ProjectJsx = <Project {...props} />;

  beforeEach(() => {
    fetchLatestPipelinesWithCommits.mockImplementation(() => syncPromiseOf(pipelines));
  });

  afterAll(() => jest.resetAllMocks());

  test('renders the project name', () => {
    const wrapper = shallow(ProjectJsx, { disableLifecycleMethods: true });

    expect(wrapper.find('h1').text()).toBe('Test Application');
  });

  test('renders a badge per ref', () => {
    jest.useFakeTimers();

    const badgeForMaster = (
      <Badge key={1} className="succeeded">
        <h2>master</h2>
        <h4>Jane Doe</h4>
        <p>Foo</p>
      </Badge>
    );
    const badgeForDevelop = (
      <Badge key={2} className="failed">
        <h2>develop</h2>
        <h4>John Doe</h4>
        <p>Bar</p>
      </Badge>
    );
    const wrapper = mount(ProjectJsx);

    expect(wrapper.contains(badgeForMaster)).toBeTruthy();
    expect(wrapper.contains(badgeForDevelop)).toBeTruthy();
    expect(wrapper.find(Badge).length).toBe(2);
  });

  it('regularly fetches data', () => {
    const intervalId = 'mockTimeoutId';
    jest.useFakeTimers();
    setInterval.mockReturnValue(intervalId);

    const wrapper = mount(ProjectJsx);

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 10000);
    expect(fetchLatestPipelinesWithCommits).toHaveBeenCalledWith(props.project);

    wrapper.unmount();

    expect(clearInterval).toHaveBeenCalledWith(intervalId);
  });
});
