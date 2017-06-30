const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./server/auth/local'); //require('./server/auth/saml');
const compression = require('compression');
const cookieSession = require('cookie-session');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ConnectRoles = require('connect-roles');
const env = process.env.NODE_ENV || 'development';
const config = require('./server/config/config.json')[env];

const app = express();


const user = new ConnectRoles({
	failureHandler: (req, res, action) => res.status(403).send({message: 'Access denied'})
})

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(cookieSession({keys: ['secret']}));
app.use(auth.initialize());
app.use(auth.session());
app.use(user.middleware());

user.use('admin', req => {
	return config.auth.admin.includes(req.user.username);
});
require('./server/routes')(app, ensureLoggedIn.bind(null, '/api/login'), user, auth)

module.exports = app;