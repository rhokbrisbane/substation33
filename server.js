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
  "project_id": "project-6353258358688553392",
  "private_key_id": "b7161b6e154c02c7ee48d7ced4f28166ed8313eb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZKIijjUzPgRmG\nPCSZQbnj4C9efbqlwGsKxJfXSNShuKpSxL0txYnmAnSswdj8IgCEPEDqOoDV1jXj\nI6/DCXgK7s1QJInoEQOmqE7If14HNW9FvtChRvP/0TluukOaPR/RCKcZ3cWAx2uS\nito4TI10p0epq+zR0jHf2XwNLTUkVo9MzcDNZPYgfewjEVLreN3UIALwUFPTjZB3\nmelBKpbbrZR9mXLgreD8xQdYwJ9hoSo1TXkRPe940oJLKYuxzgFQRwfIR7dTyftm\nmlTxwMiSrvbFG9Gxk8lvCZdRAXhCDRRxP1QbDQ9aLWGSQ5qvKVAPpX7I+mkrRCD6\n6KHOzoFtAgMBAAECggEBAIPq5cX5bq9MAzAbnWpjsjkUX7iDksAxfAFKU36avIqP\nBCVGT6uc+amjc9tZHAwPPWKog0E8IrwMRV3e3wSeo0bHaRAeaKn5/asOTM1k5xhO\nbgkk0Y4YDxHIpC87P/8Zps3lJgihe/vvyDfwYQUc6roPWypJazFOWqb0LGUtCxjA\nGKi2Pyhs7g8JO/IfIUhoKv7pdmed92qvkksQyGtEpMsyOvpsSBcTYIXYxsdNcYEU\njs3wcnQvBGh87ShXKu3HlyihY9p49bLvh3ALI94E85Ly2P234m16APjZ42wnf4DT\n+24b3ZOBVq630qZnv03t6qOwkeoSQHVmDN7Rdr9OgAECgYEA9YDxNaxrMaxeIz/7\nUHLySiB9/b42Wlywv4/YR6QtJHktMSBIdpi4QVoHG0wjmYbQ7J67dp4r1sZ8gcSz\nUuXCF0vDQKoG/ulwgAlv0uWGX4c2upND9DwmqjFHsUJlTCO/+q/DV7bptIKE1+qw\nB27lcmCIemfZqomBLjd3ZdPcOUECgYEAn7TdO8Bps6MvHj3PrmjPMkp4RdgIIOYk\nOykxlEeY8ppqTRphhK7fmkv82VPsSyiSorqQjnlN6+RAtzafo+Bs1cWQff58Je4+\ng6NSeN0Fy58ISjJY4VpN2s1PHzV0Nc3QT3FFE2Vy+2wzRU8TZ3heT/ZkLOS8tLqM\nXwEgvMZjMS0CgYAcHiKCNTcpv0Yg32kXM7MQTlxfvXNYMhmENyNcQS9yZ/aHE914\nx9ECmx8JP1UsdkZjc2KhGUiIFr+X1UF8kxgBtwmr1E1s0Kuz3mDSVLtpIYFhKRC1\nXlZHU9GUObiEWevY+Fx1JVvq8q/oUtbKYycgTHIVIuPJJmqHMo8YOIWWgQKBgQCL\nxdH9smeQJVhegkBZ5za3T/+1ON3cVS8Oa/4NRSAx6zzvoBAK/LWLp8dyOQXLvYWg\nT+GmH7o3onuVHYRX+1mlOhQ8gNYMqFckBHNwfhfNXrD1ptys1cjfnuIJcVH0qN0Q\nOhT3ZcldDBRPK2bTHsCEASMpO0OAdOfXWfhZ3tL/PQKBgHeV1oqYsYGOyPKFsjfM\nHjX/gJ+FUhELx/JW5DsPe1ykL6wYj0l50qYaOJGJH9Z99vhKM8Ke8mzWOKgPal2V\n0FeLAfk/3pE8/YfLqOzn7OQVBWC7y0dW1PqNkqbtng+CFSNM1JW30HI+g1y4tZg1\ngg6MXKjOgvFpfIr2bhMNJ4AU\n-----END PRIVATE KEY-----\n",
  "client_email": "subsystem33@project-6353258358688553392.iam.gserviceaccount.com",
  "client_id": "103286558558205291268",
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
      });
    } else {
      var updates = {};
      updates['/collections/' + key] = req.body;
      firebase.database().ref().update(updates).then(function(result) {
        res.json({ response: 'request received!' });
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
