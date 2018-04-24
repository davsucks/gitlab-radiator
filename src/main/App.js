import React from 'react';
import PropTypes from 'prop-types';
import Project from './Project';

const App = ({ projects }) => (
  <div className="wrapper">
    {projects.map(project => <Project key={project.id} project={project} />)}
  </div>
);

App.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default App;
