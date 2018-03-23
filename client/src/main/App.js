import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Project from './Project';

export default class App extends Component {
  render() {
    const { projects } = this.props;
    return (
        <Fragment>
          <Row>
            {projects.map(project => (
                <Project key={project.id} id={project.id} name={project.name}/>
            ))}
          </Row>
        </Fragment>
    );
  }
}
