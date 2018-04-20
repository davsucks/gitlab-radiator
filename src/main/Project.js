import React, { Component } from 'react';
import { Badge, Col } from 'reactstrap';
import fetch from 'node-fetch';
import PropTypes from 'prop-types';
import config from '../config.json';
import './Project.css';
import './GitLab.css';

const { accessToken, parentDomain } = config;
const url = `https://gitlab.${parentDomain}.com/api/v4`;
const headers = { headers: { 'Private-Token': accessToken } };

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
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
    fetch(`${url}/projects/${this.props.id}/pipelines`, headers)
      .then(res => res.json())
      .then(pipelines => pipelines.filter(pipeline => pipeline.ref === 'master'))
      .then(pipelines => pipelines[0])
      .then((pipeline) => {
        this.setState(() => ({ currentStatus: pipeline.status }));
      })
      .catch(console.error);
  }

  render() {
    const { name } = this.props;
    const { currentStatus } = this.state;
    return (
      <Col className="Project" xs="auto">
        <Badge className={currentStatus}>
          <h1>{name}</h1>
        </Badge>
        <p className="Project-intro">{this.state.response}</p>
      </Col>
    );
  }
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Project;
