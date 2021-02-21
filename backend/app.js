const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cordinateRoutes = require('./routes/cordinate');
const app = express();

//Secure the application, XSS protection, app.use(helmet()) is the first middleware to execute in our application
app.use(helmet());

//allow any origin headers (avoid CORS issues)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//parse POST data with this middleware
app.use(bodyParser.json());

app.use('/api/park', cordinateRoutes);
module.exports = app; //export app in order to use it in the server.js