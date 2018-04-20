/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Pipelines, Pipeline } from '../main';

describe('<Pipelines />', () => {
  it('renders a pipeline', () => {
    const pipeline = {
      ref: 'master',
      name: 'Pipeline 1',
      id: '1',
      status: 'success'
    };
    const wrapper = shallow(<Pipelines pipelines={[pipeline]} />);
    expect(wrapper.contains(<Pipeline pipeline={pipeline} />)).to.equal(true);
  });
});
