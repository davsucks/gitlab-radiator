import React, { Component, Fragment } from 'react';
import Pipeline from './Pipeline';

export default class Pipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pipelines: props.pipelines
    };
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(() => ({ pipelines: props.pipelines }));
  }

  render() {
    const { pipelines } = this.state;
    return (
        <Fragment>
          {pipelines.map(pipeline => (
              <Pipeline key={pipeline.id} pipeline={pipeline}/>
          ))}
        </Fragment>
    )
  }
}
