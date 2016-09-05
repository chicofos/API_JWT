var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config');
var morgan = require('morgan');
var router = require('./router')(express);

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('superSecret', config.secret);
app.use(morgan('dev'));
app.use('/api', router);

app.listen(port, () => console.log('Server running on port %s', port));
