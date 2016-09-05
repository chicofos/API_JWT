var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://fosco:testingmlab@ds147965.mlab.com:47965/notes');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var router = require('./router')(express);
app.use('/api', router);

app.listen(port, () => console.log('Server running on port %s', port));
