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
  "serviceAccount": {
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/subsystem33%40project-6353258358688553392.iam.gserviceaccount.com"
  }
});

var db = firebase.database();
var ref = db.ref("collections");

app.use(express.static(__dirname + '/build'));
app.use('/api', router);

router.use(bodyParser.json());

router
  .get('/collections/:date', (req, res) => {
    
    var date = req.params.date;
    
    var ref = firebase.database().ref("collections");
    ref.orderByChild("donation/date").equalTo(parseInt(date)).once('value').then(function(snapshot) {
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
  .post('/collection', (req, res) => {
    
    var key = req.query.key;
  
    if (key == undefined) {
      firebase.database().ref('/collections/').push(req.body).then(function(result) {
        res.json({ response: 'request received!' });
        if (req.donation.total_donation_weight > 0) {
          emailGateway.sendThankYouEmail({ to: req.customer.email });
        }
      });
    } else {
      var updates = {};
      updates['/collections/' + key] = req.body;
      firebase.database().ref().update(updates).then(function(result) {
        res.json({ response: 'request received!' });
        if (req.donation.total_donation_weight > 0) {
          emailGateway.sendThankYouEmail({ to: req.customer.email });
        }
      }); 
    }
    
  });
router.route('/emails/thank-you')
  .post((req, res) => {
    emailGateway.sendThankYouEmail({ to: req.body.to });

    res.json({ status: 'ok' });
  });

app.listen(port, () => {
  console.log(`Now listening on ${ port }`);
});
