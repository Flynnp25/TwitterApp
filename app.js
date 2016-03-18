// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var request = require('request');

// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//Apis


app.get('/api/getUserTimeLine/:screenName', function(req, res) {

    var key = '5VwJxifQyX0tSJFuRdNaYbMlp';
    var secret = 'sg7mvtYBKEQ2HKu6RZAT5ZdP34WC9xjKpKbI1TDyGjPThWTloz';
    var cat = key + ":" + secret;
    var buffer = new Buffer(cat);
    var credentials = buffer.toString('base64');
    var screenname = req.params.screenName;

    var oauth2Options = {
        method: "POST",
        url: "https://api.twitter.com/oauth2/token",
        headers: {
            "Authorization": "Basic " + credentials,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: "grant_type=client_credentials"
    };


    var access_token;
    request(oauth2Options,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            access_token = info.access_token;
            getUserTimeline(access_token);
            return;
        }
        console.log("Error : "+body);
    });

var getUserTimeline = function(accessToken){

    var options = {
        method: "GET",
        url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+screenname,
        headers: {
            "Authorization": "Bearer " + accessToken,
        }};

    request(options,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        console.log("Error : "+body);
    });
};
});
// listen (start app with node server.js) ======================================

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(8080);
console.log("App listening on port 8080");