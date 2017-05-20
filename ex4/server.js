var http = require('http');
var express = require('express');
var Session = require('express-session');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2; var plus = google.plus('v1');
var cs = require('./cs.json');

const ClientId = cs.web.client_id;
const ClientSecret = cs.web.client_secret;
const RedirectionUrl = "http://localhost:1234/oauthCallback";

//starting the express app
var app = express();

//using session in express
app.use(Session({
	secret: 'keyboard-cat-secret-19890913007',
	resave: true,
	saveUninitialized: true
}));

function getOAuthClient () {
  console.log("Getting oAuth client...");
	return new OAuth2(ClientId, ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
  console.log("Getting Auth URL...");
	var oauth2Client = getOAuthClient();
	var scopes = [
		'https://www.googleapis.com/auth/plus.me'
	];

	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes
	});
  console.log(url);
	return url;
}

// Callback route
app.use("/oauthCallback", function (req, res) {
  console.log("Getting callback route...");
	var oauth2Client = getOAuthClient();
	var session = req.session;
	var code = req.query.code; // the query param code
	oauth2Client.getToken(code, function(err, tokens) {
		// Now tokens contains an access_token and an optional refresh_token. Save them.
		if(!err) {
			oauth2Client.setCredentials(tokens);
			//saving the token to current session
			session["tokens"]=tokens;
			res.send(`
        <h3>Login successful!</h3>
        <a href="/details">Go to details page</a>
			`);
		}else{
			res.send(`
        <h3>Login failed!</h3>
			`);
		}
	});
});

// Base route
app.use("/", function (req, res) {
  var url = getAuthUrl();
	res.send(`
    <h1>Authentication using Google oAuth</h1>
    <a href=${url}>Login</a>
	`)
});

var port = 1234;
var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
	console.log(`listening to ${port}`);
});

