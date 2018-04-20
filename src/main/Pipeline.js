import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Pipeline = (props) => {
  const { pipeline } = props;
  const color = pipeline.status === 'success' ? 'success' : 'danger';
  return (
    <Alert color={color}>id: {pipeline.id}, ref: {pipeline.ref}</Alert>
  );
};

Pipeline.propTypes = {
  pipeline: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ref: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Pipeline;
