var chat = require('./chatModel.js');
// var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  return decodedToken.username;
}

// //takes data object ({to: xx, from: xx, message: xx}) and returns an object with appriate query params
// var processMessage = function(data) {

// }

//expects post request to /chat with json 
// { "to": "cindy",
//     "from": "ting",
//     "message": "hello!"
// }

module.exports = {
  postMessage: function (req, res, next) { 
    // var senderUsername = getUsername(req.query.token); //should I auth?
    // var senderUsername = req.body.from;
    // var receiverUsername = req.body.to;
    // var message = req.body.message;
    
    var unprocessedParams = { 
      to: req.body.to,
      from: req.body.from,
      message: req.body.message
    }

    console.log("unprocessedParams is ", unprocessedParams);

    chat.postMessage(unprocessedParams, function(err, data) {
      if(err) console.log(err);

      if(data) {
        console.log("message posted to db!", data);
        res.end();
      }
    })
  },

  getMessages: function (req, res, next) {
    //TODO: replace filler values
    var unprocessedParams = {
      to: "cindy",
      from: "ting",
    };

    chat.getMessages(unprocessedParams, function(err, data) {
      if (err) console.log(err);

      if(data) {
        console.log("messages received from db!!!!!!", data);
        res.end();
      }
    });
  }

}

  