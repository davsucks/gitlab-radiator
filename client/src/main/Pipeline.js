import React from 'react';
import { Alert } from 'reactstrap';

const Pipeline = (props) => {
  const { pipeline } = props;
  const color = pipeline.status === 'success' ? 'success' : 'danger';
  return (
    <Alert color={color}>id: {pipeline.id}, ref: {pipeline.ref}</Alert>
  );
};

export default Pipeline;
