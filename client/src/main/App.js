import React, { Component, Fragment } from 'react';
import Project from './Project';

export default class App extends Component {
  render() {
    const { projects } = this.props;
    return (
        <Fragment>
          {projects.map(project => (
              <Project key={project.id} id={project.id} name={project.name}/>
          ))}
        </Fragment>
    );
  }
}
