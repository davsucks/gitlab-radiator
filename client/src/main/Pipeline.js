import React from 'react';
import { Alert } from 'reactstrap';

const Pipeline = (props) => {
// eslint-disable-next-line react/prop-types
  const { pipeline } = props;
  const color = pipeline.status === 'success' ? 'success' : 'danger';
  return (
    <Alert color={color}>id: {pipeline.id}, ref: {pipeline.ref}, sha: {pipeline.sha}</Alert>
  );
};

export default Pipeline;
