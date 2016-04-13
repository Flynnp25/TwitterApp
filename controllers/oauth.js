/**
 * Created by Paddy on 13/04/2016.
 */

exports.getAccessToken = function(callback) {
    var request = require('request');

    var key = '5VwJxifQyX0tSJFuRdNaYbMlp';
    var secret = 'sg7mvtYBKEQ2HKu6RZAT5ZdP34WC9xjKpKbI1TDyGjPThWTloz';
    var cat = key + ":" + secret;
    var buffer = new Buffer(cat);
    var credentials = buffer.toString('base64');

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
    request(oauth2Options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            access_token = info.access_token;
            callback(access_token);
            return access_token;
        }
        console.log("Error : " + body);
    });
};