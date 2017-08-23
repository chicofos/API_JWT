var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config');
var morgan = require('morgan');
var router = require('./router')(express);
var cors = require('cors'); 
var argv = require('minimist')(process.argv.slice(2));
var subpath = express();

mongoose.connect(config.database);

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/v1", subpath);
app.set('superSecret', config.secret);
app.use(morgan('dev'));
app.use('/api', router);
app.use(express.static('dist'));

var swagger = require('swagger-node-express').createNew(subpath);

swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});


    
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')


if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);

swagger.setAppHandler(app); 
swagger.configure(applicationUrl, '1.0.0');



app.listen(port, () => console.log('Server running on port %s', port));
