const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./server/auth/local'); //require('./server/auth/auth');
const compression = require('compression');
const cookieSession = require('cookie-session');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(cookieSession({keys: ['secret']}));
app.use(auth.initialize());
app.use(auth.session());




require('./server/routes')(app)
app.get('*', (_, res) => res.status(200).send({
	message: 'Hello app sec world!'
}));

module.exports = app;