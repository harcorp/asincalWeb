var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  admin = require("firebase-admin");

const serviceAccount = require('./asincal-6d074-firebase-adminsdk-0e5sj-34ad4674a2.json');
var port = process.env.PORT || 6969;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://asincal-6d074.firebaseio.com'
});

var db = admin.firestore();
var usersRef = db.collection('users');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('welcome to the home page!');
});

var apiRouter = express.Router();

apiRouter.use(function (req, res, next) {
  console.log("someone just came to the app");
  // this is where we authenticate users
  next();
});

apiRouter.get('/', function (req, res) {
  res.json({
    message: 'woah check out this json'
  });
});

apiRouter.route('/users')
  .post(function (req, res) {
    var newUser = req.body;
    if(!newUser.photoURL) newUser.photoURL = 'https://api.adorable.io/avatars/285/asincal.png';
    admin.auth().createUser({
      email: newUser.email,
      emailVerified: true,
      phoneNumber: '+57' + newUser.mobile,
      password: newUser.password,
      displayName: newUser.firstName + ' ' + newUser.lastName,
      photoURL: newUser.photoURL,
      disable: false
    }).then(function(respuesta) {
      newUser.password = null;
      usersRef.doc(respuesta.uid).set(newUser).then(function (r) {
        res.json(r);
      })
      .catch(function(err) {
        handleError(res, err.message, 'Failed');
      });
    }).catch(function(e) {
      //res.json(e);
      handleError(res, e.message, 'Failed', e.code);
    })
  });


apiRouter.route('/users/:uid')

  .get(function (req, res) {
    res.json({
      message: 'woah check out this json'
    });
  })
  .put(function (req, res) {
    console.log(req.body);
  });


app.use('/api', apiRouter);
app.listen(port);
console.log('port: ' + port);


function handleError(res, reason, message, fireCode) {
  console.log("ERROR: " + reason);
  res.status(500).json({
    "error": fireCode
  });
}
