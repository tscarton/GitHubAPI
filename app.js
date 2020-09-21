/**
 * NodeJS Project to get repos from Github.
 * Frameworks used:
 * - Express : Web framework for Node
 * - Cors : Used to avoid cross-origin during the response
 */
const express = require('express');
const cors = require('cors');
const GitController = require('./GitController');
const logger = require('./Log');

// Using Express to generate the server
const app = express();

// Enabling CORS
app.use(cors())

// Rest function to get the repositories
app.get('/api/repositories', function(req, res) {
  logger.info('/api/repositories called');
  GitController.getRepos(req, res);
});

// If the client tries to access '/' return 501
app.get('/', function(req, res) {
  res.status(501).send("Method not implemented, use '/api/repositories'");  
});

// The default port used is 5000, but Heroku needs to change it. Check Readme.md to get the link to this service.
const PORT = process.env.PORT || 5000;

// Enable the list
const server = app.listen(PORT, ()=> {
  logger.info('Server running on port %d', PORT);
});

module.exports = app;