// ./server.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors())

app.use(logger('dev'));
// there's no need to mount express.urlencoded middleware
// why is that?
app.use(express.json());

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});