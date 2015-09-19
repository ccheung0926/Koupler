var profile = require('./profileModel.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');

var getUsername = function(token) {
  var decodedToken = jwt.decode(token);
  console.log("decodedToken:" , decodedToken);
  return decodedToken.username;
};

module.exports = {

  loadProfile: function (req, res, next) {
    var username = req.params.username;
    var token = req.headers['x-access-token'];
    var requestor = getUsername(token); //note strange but working syntax

    profile.getProfileInfo([ username ], function(err, data) {
      if(err) console.log(err);

      if(data) {
        console.log("profile data received!", data);
        if (requestor === username) {
          data[0].isAuthorizedToEdit = true;
        };
        res.send(data);
      }
    });
  },

  loadProfilePic: function(req, res, next) {
    console.log("requesting profile pic from database...");

    // node-mysql expects parameter to be an array
    profile.getProfilePic([req.params.username], function(filePath) {
      if (filePath) {
        res.sendFile(filePath, function(err) {
          if (err) {
            console.log("failed to get profile pic...");
            console.error(err);
            res.status(err.status).end();
          }
          else {
            console.log("sent file: ", filePath);
            res.status(200).end();
          }
        });
      }
    });
  },

  storeProfilePic: function(req, res, next) {
    console.log("attempting to save profile pic to server...");

    // formidable parses data from image upload form front client.
    // files can be accessed using the files variable
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      profile.setProfilePic([req.params.username, file], function(err) {
        if (err) {
          console.log("Could not save to server");
        }
        else {
          console.log("Saved profile pic to server");
        }
      });
    });
    res.status(201).send("Profile pic saved");
    res.end();
  },

  loadMemories: function(req, res, next) {

  },

  storeToMemories: function(req, res, next) {

  },
};
