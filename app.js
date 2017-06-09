const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (_, res) => res.status(200).send({
	message: 'Hello app sec world!'
}));

module.exports = app;