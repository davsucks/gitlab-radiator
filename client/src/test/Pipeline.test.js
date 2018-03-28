/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Pipeline } from '../main/';

describe('<Pipeline />', () => {
  describe('when the pipeline succeeds', () => {
    it('renders the pipeline in a green box', () => {
      const wrapper = shallow(<Pipeline pipeline={{ status: 'success' }} />);
      expect(wrapper.prop('color')).to.equal('success');
    });
  });

  describe('when the pipelines fails', () => {
    it('renders the pipeline in a red box', () => {
      const wrapper = shallow(<Pipeline pipeline={{ status: 'failure' }} />);
      expect(wrapper.prop('color')).to.equal('danger');
    });
  });
});
