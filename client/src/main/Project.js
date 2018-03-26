import React, { Component } from 'react';
import { Badge, Col } from 'reactstrap';
import fetch from 'node-fetch';
import './Project.css';
import Pipelines from './Pipelines';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      gitlab: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchPipelines = this.fetchPipelines.bind(this);
  }

  componentDidMount() {
    const tenSecondsInMillis = 10 * 1000;
    setInterval(this.fetchPipelines, tenSecondsInMillis);
    this.fetchPipelines();
  }

  fetchPipelines() {
    fetch(`/projects/${this.props.id}/pipelines`)
      .then(res => res.json())
      .then(res => {
        const truncatedPipelines = res.pipelines.slice(0, 4);
        this.setState(() => ({ gitlab: truncatedPipelines }));
        return truncatedPipelines;
      })
      .then((pipelines) => {
        const projectIsGreen = pipelines[0].status === 'success';
        console.log(pipelines);
        console.log('project is green? ', projectIsGreen);
        this.setState(() => ({ projectIsGreen }));
      })
      .catch(console.error);
  }

  render() {
    const { name } = this.props;
    const { projectIsGreen } = this.state;
    return (
      <Col className="Project" xs="auto">
        <Badge className={projectIsGreen ? 'success' : 'failure'}><h1>{name}</h1></Badge>
        <p className="Project-intro">
          {this.state.response}
          <Pipelines pipelines={this.state.gitlab} />
        </p>
      </Col>
    );
  }
}

export default Project;
