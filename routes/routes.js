/**
 * Created by Paddy on 13/04/2016.
 */
module.exports = function (app) {
    var controller = require('../controllers/twitter');
    app.get('/api/getUserTimeLine/:screenName', controller.getUserTimeline);
};