'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const firebase    = require('firebase');
const app         = express();
const router      = express.Router();
const config      = require('./server/config');
const emailGateway = require('./server/email_gateway');
const port        = config.port;

const helpers     = require('./server/helpers.js');

firebase.initializeApp({
    "databaseURL": "https://project-6353258358688553392.firebaseio.com",
    "serviceAccount": "config/firebase.json"
});

var db = firebase.database();
var ref = db.ref("collections");

app.use(express.static(__dirname + '/build'));
app.use('/api', router);

router.use(bodyParser.json());

router
  .post('/collections', (req, res) => {
    
    var newCollectionKey = firebase.database().ref().child('collections').push().key;

    var updates = {};
    updates['/collections/' + newCollectionKey] = req.body;
  
    firebase.database().ref().update(updates).then(function(result) {
      console.log(req.body);
      res.json({ response: 'request received!' });
    })
  })
  .get('/collections/:date', (req, res) => {
    
    var date = req.params.date;
    
    var ref = firebase.database().ref("collections");
    ref.orderByChild("donation/date").equalTo(date).once('value').then(function(snapshot) {
      res.json(snapshot.val());
    });
    
  })
  .get('/collection/:key', (req, res) => {
    
    var key = req.params.key;
    
    var ref = firebase.database().ref("collections");
    ref.orderByKey().equalTo(key).once('value').then(function(snapshot) {
      res.json(snapshot.val());
    });
    
  })
  .post('/collection/:key', (req, res) => {
    
    var key = req.params.key;

    var updates = {};
    updates['/collections/' + key] = req.body;
  
    firebase.database().ref().update(updates).then(function(result) {
      console.log(req.body);
      res.json({ response: 'request received!' });
    })
    
  });
router.route('/emails/thank-you')
  .post((req, res) => {
    emailGateway.sendThankYouEmail({ to: req.body.to });

    res.json({ status: 'ok' });
  });

app.listen(port, () => {
  console.log(`Now listening on ${ port }`);
});
