import React, { Component } from 'react';
import { Badge, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchLatestPipeline } from './services';
import './Project.css';
import './GitLab.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.state = {
      currentStatus: null
    };
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
    return (
      <Col className="Project" xs="auto">
        <Badge className={this.state.currentStatus}>
          <h1>{this.props.name}</h1>
        </Badge>
      </Col>
    );
  }
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Project;
