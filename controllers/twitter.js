/**
 * Created by Paddy on 13/04/2016.
 */
var request = require('request');
var oauth = require('./oauth');

exports.getUserTimeline = function(req, res){

    var screenname = req.params.screenName;

    oauth.getAccessToken(function (accessToken) {

    var options = {
        method: "GET",
        url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+screenname,
        headers: {
            "Authorization": "Bearer " + accessToken
        }};

    request(options,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        console.log("Error : "+body);
    });
    });
};