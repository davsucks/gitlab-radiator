import React, { Component } from 'react';
import { Badge, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchLatestPipeline } from './services';
import './Project.css';
import './GitLab.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    const tenSecondsInMillis = 10 * 1000;
    setInterval(this.fetch, tenSecondsInMillis);
    this.fetch();
  }

  fetch() {
    fetchLatestPipeline(this.props.id).then((pipeline) => {
      this.setState(() => ({
        currentStatus: pipeline ? pipeline.status : null
      }));
    });
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
