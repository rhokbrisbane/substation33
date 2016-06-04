'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const router      = express.Router();
const port        = 8080;

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
