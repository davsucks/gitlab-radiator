import React, { Component } from 'react';
import Pipeline from './Pipeline';

export default class Pipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      pipelines: this.props.pipelines
    };
  }
  render() {
    const { pipelines } = this.state;
    return pipelines.map(pipeline => <Pipeline pipeline={pipeline} />);
  }
}
