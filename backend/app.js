/* eslint-disable one-var */

const express = require('express'),
  httpStatus = require('http-status-codes'),
  randomstring = require('randomstring'),
  SpotifyWebApi = require('spotify-web-api-node'),
  router = express.Router(),
  app = express(),
  port = process.env.PORT || 3000;

// initialize spotify api instance
const spotifyApi = new SpotifyWebApi({
  clientId: '', // your client id goes here
  clientSecret: '', // your client secret goes here
});

// spotify api scopes
const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-read-private',
  'user-read-email',
  'user-read-birthdate',
  'user-follow-modify',
  'user-follow-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
];

// router middleware
router.use((req, res, next) => {
  // website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', false);

  // pass to next layer of middleware
  next();
});

// getAuthURL endpoint
router.route('/getAuthURL').get((req, res) => {
  const redirectURI = req.query.redirectURI || null,
    state = randomstring.generate();

  spotifyApi.setRedirectURI(redirectURI);
  res.json({ url: spotifyApi.createAuthorizeURL(scopes, state) });
});

// getToken endpoint
router.route('/getToken').get((req, res) => {
  const code = req.query.code || null;

  try {
    spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
          refreshToken: data.body.refresh_token,
        });
      }).catch((err) => {
        res.send(err);
      });
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).send('Bad Request');
  }
});

// refreshToken endpoint
router.route('/refreshToken').get((req, res) => {
  const refreshToken = req.query.token || null;

  try {
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.refreshAccessToken()
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
        });
      }).catch((err) => {
        res.send(err);
      });
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).send('Bad Request');
  }
});

// register router
app.use('/music-app/v1', router);

// register static folder
app.use(express.static('public'));

// listen on port (default: 3000)
app.listen(port);
