'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var webPush = require('web-push');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//To receive push request from client
app.post('/send__notification', function (req, res) {
  if (!req.body) {
    res.status(400);
  }

  var payload = 'Here is a payload!';

  var options = {
    gcmAPIKey: 'AIzaSyCS0RYj59k_FrZ1K7PJBa7NNJkZWMTSOuM',
    vapidDetails: {
      subject: 'mailto:example_email@example.com',
      publicKey: 'BNhTttYLYJxkxjWsgh-W43cD822_nt_HORc0DDTrETbkNGGVZB6SAjzjJ3xX4ArdimnVinql_mC8_k0_BmIsXdU',
      privateKey: '3QYE-MPom1m4bmsg4x9xdZ9hghxiMv4o53HetPPVsRg'
    },  
    TTL: 60
  };

  webPush.sendNotification(
    req.body,
    payload,
    options
  );

  res.json({ ok: true });

});

app.listen(process.env.PORT || 3000, function() {
  console.log('Local Server : http://localhost:3000');
});
