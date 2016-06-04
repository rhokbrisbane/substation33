'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const firebase    = require('firebase');
const app         = express();
const router      = express.Router();
const port        = 8081;

firebase.initializeApp({
    "databaseURL": "https://project-6353258358688553392.firebaseio.com",
    "serviceAccount": "config/firebase.json"
});

app.use(express.static(__dirname + '/build'));
app.use('/api', router);

router.use(bodyParser.json());

router.route('/collection')
  .post((req, res) => {
    console.log(req.body);
    res.json({ response: 'request received!' });
  });

app.listen(port, () => {
  console.log(`Now listening on ${ port }`);
});
