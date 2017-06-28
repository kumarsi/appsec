const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./server/auth/local'); //require('./server/auth/saml');
const compression = require('compression');
const cookieSession = require('cookie-session');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(cookieSession({keys: ['secret']}));
app.use(auth.initialize());
app.use(auth.session());




require('./server/routes')(app)

//Testing login routes

app.get('/', (req, res) => res.status(200).send({message: "Hello!", user: req.user}))

app.post('/login', auth.authenticate('local', {failureRedirect: '/login'}),
	(req, res) => res.redirect('/'));

app.get('/login', (_, res) => res.status(200).send({message: 'You must login with a username and password. Use POSTMan.'}));

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/profile', ensureLoggedIn(), (req, res) => 
	res.status(200).send({message: 'This is your profile', user: req.user}));

//Tetsing login routes end




app.get('*', (_, res) => res.status(200).send({
	message: 'Hello app sec world!'
}));


module.exports = app;