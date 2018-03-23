import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
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
    // eslint-disable-next-line react/prop-types
    this.fetchPipelines()
      .then(res => this.setState(() => ({ gitlab: res.pipelines })))
      .catch(console.error);
  }

  fetchPipelines() {
    return fetch(`/projects/${this.props.id}/pipelines`).then(res => res.json());
  }

  render() {
    const { name } = this.props;
    return (
      <div className="Project">
        <Jumbotron><h1>{name}</h1></Jumbotron>
        <p className="Project-intro">
          {this.state.response}
          <Pipelines pipelines={this.state.gitlab}/>
        </p>
      </div>
    );
  }
}

export default Project;
