const express = require('express');
const routes = require('./src/main/routes');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello World' });
});

app.get('/projects/:projectId/pipelines', (req, res) => {
  routes.fetchPipelinesForProject(req.params.projectId)
    .then(pipelines => res.send({ pipelines }));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
