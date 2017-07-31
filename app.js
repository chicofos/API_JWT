var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config');
var morgan = require('morgan');
var router = require('./router')(express);
var cors = require('cors'); 

mongoose.connect(config.database);

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('superSecret', config.secret);
app.use(morgan('dev'));
app.use('/api', router);

app.listen(port, () => console.log('Server running on port %s', port));
