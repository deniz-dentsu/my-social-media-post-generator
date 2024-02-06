const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Apply bodyParser to parse json for all incoming requests
app.use(bodyParser.json());

// Import your handler function from generate-copy.ts
const generateCopyHandler = require('./generate-copy');

// Route to handle POST requests
app.post('/generate-copy', generateCopyHandler);

module.exports = app;
