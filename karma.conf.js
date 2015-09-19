module.exports = function(config){

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'bower_components/socket.io-client/socket.io.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/ng-file-upload/ng-file-upload.min.js',
    'client/app/app.js',
    'client/index.js',
    'client/app/**/*.js',

    //our templates
    'client/app/**/*.html',

    //our spec files
    'specs/client/**/*.js'
    ],

    exclude: [
      'karma.conf.js'
    ],

    preprocessors: {
      // 'client/app/**/*.html': ['ng-html12js'],
      'client/app/**/*.js': ['coverage']
    },

    // ngHtml2JsPreprocessor: {
    //   stripPrefix: 'client/app/',
    //   moduleName: 'templates'
    // },

    reporters: ['progress', 'coverage', 'nyan', 'unicorn'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    port: 8080,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: true


  });
};
