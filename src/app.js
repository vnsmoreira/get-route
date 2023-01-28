const express = require('express');
const cors = require('cors');

const routes = require('./app/routes');
const limiter = require('./config/rate-limit');
const middleware = require('./app/middleware');

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/distance', middleware, routes);

module.exports = { app };
