var activityCtrl = require('./activityCtrl');

module.exports = function(app) {
  // app.get('/match', activityCtrl.getActivities);
  app.post('/match', activityCtrl.getMatches);
  app.post('/suggestions', activityCtrl.getSuggestions);
};