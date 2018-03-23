import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import fetch from 'node-fetch';
import './App.css';
import Pipelines from './Pipelines';


class App extends Component {
  static fetchPipelinesForProject(projectId) {
    return fetch(`/projects/${projectId}/pipelines`)
      .then(res => res.json());
  }

  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { projectId } = this.props;
    App.fetchPipelinesForProject(projectId)
      .then(res => this.setState({ gitlab: res.pipelines }))
      .catch(console.error);
  }

  render() {
    const { projectName } = this.props;
    console.log(projectName);
    return (
      <div className="App">
        <Jumbotron><h1>{projectName}</h1></Jumbotron>
        <p className="App-intro">
          {this.state.response}
          <Pipelines pipelines={this.state.gitlab || []}/>
        </p>
      </div>
    );
  }
}

export default App;
