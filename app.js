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
require('./server/routes')(app, ensureLoggedIn, user)

//Login routes

app.get('/', (req, res) => res.status(200).send({message: "Hello!", user: req.user}))

app.post('/login', auth.authenticate('local', {failureRedirect: '/login'}),
	(req, res) => res.redirect('/'));

app.get('/login', (_, res) => res.status(200).send({message: 'You must login with a username and password.'}));

app.post('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/profile', ensureLoggedIn(), (req, res) => 
	res.status(200).send({message: 'This is your profile', user: req.user}));

app.get('/profile/admin', ensureLoggedIn(), user.is('admin'), (req, res) => 
	res.status(200).send({message: 'This is your admin profile', user: req.user}));

//Login routes end



//Catch-all route
app.get('*', (_, res) => res.status(200).send({
	message: 'Hello app sec world!'
}));
//Catch-all route end


module.exports = app;