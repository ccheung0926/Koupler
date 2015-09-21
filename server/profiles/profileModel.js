var dbConnection = require('../db/index.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var moment = require('moment');

//var queryDb = function(queryString, params, callback) {
  //dbConnection.query(queryString, params, function(err, data) {
    //if (err) {
      //console.error('Database ' + err);
    //}

    //callback(err, data);
  //});
//};

module.exports = {

  getProfileInfo: function(params, callback) {
    console.log("inget getProfileInfo!");
    var queryString = 'SELECT * FROM couples WHERE couples.username = ?;';
    //queryDb(queryString, params, callback);
    dbConnection.query(queryString, params, callback);
  },

  // params: [username]
  getProfilePic: function(params, callback) {
    var queryString = 'SELECT photo_filepath FROM couples WHERE username = ?;';

    dbConnection.query(queryString, params, function(err, results) {
      if (err) {
        console.error(err);
      }
      else {
        var filePath = results[0].photo_filepath;
        callback(filePath);
      }
    });
  },

  // input: params expects an array [username, file]
  setProfilePic: function(params, callback) {
    var username = params[0];
    var file = params[1];
    var fileExtension = path.extname(file.name);
    var date = moment().format('MM-DD-YY');
    var fileName = username + date + fileExtension;
    var cwd = process.cwd();
    // path to directory where profile-pic is saved
    var targetPath = path.resolve(cwd + "/server/assets/" +
                                  username + "/profile-pic/");

    // path to profile-pic on server
    var filePathServer = targetPath + "/" + fileName;

    // create directories if it doesn't exist
    mkdirp(targetPath, function(err) {
      if (err) {
        console.error(err);
      }

      // move and rename image from temp location to filePathServer
      fs.rename(file.path, filePathServer, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });

    var queryString = 'UPDATE couples SET photo_filepath = ? WHERE username = ?;';

    // express serves static files in server/assets. Path to pic need to be
    // relative from the asset folder
    var picFilePath = "./" + username + "/profile-pic/" + fileName;
    dbConnection.query(queryString, [picFilePath , username], callback);
  },

  getMemories: function(callback) {

  },

  addToMemories: function(callback) {

  }
};
