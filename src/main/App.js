import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import Project from './Project';

const App = ({ projects }) => (
  <Fragment>
    <Row>
      {projects.map(project => <Project key={project.id} id={project.id} name={project.name} />)}
    </Row>
  </Fragment>
);

App.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default App;
