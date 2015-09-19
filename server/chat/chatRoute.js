var chatCtrl = require('./chatCtrl.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  console.log("in chatRoute!")
  app.get('', chatCtrl.getMessages);
  app.post('', chatCtrl.postMessage); 
};