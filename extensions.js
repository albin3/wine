var mongoose = require('mongoose'),
    swig = require('swig'),
    log4js = require('log4js'),
    _ = require('underscore'),
    path = require('path'),
    helpers = require('./helpers');   // helper funcs

var odm = exports.odm = {};
var tmpl_engine = exports.tmpl_engine = {};
var logger = exports.logger = {};

odm.init_app = function(app) {
  // mongoose
  function connect_db(db_uri) {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(db_uri, options);
  }

  connect_db(app.DB_URI);

  mongoose.connection.on('error', function(err) {
    if (app.DEBUG) {
      console.error(err.message.underline.red);
      console.error(err.stack);
    }
  });

  // 发生错误，数据库重连
  mongoose.connection.on('disconnected', function() {
    connect_db(app.DB_URI);
  });
  // End
};

tmpl_engine.init_app = function(app) {
  // swig
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', app.TEMPLATE_DIR);           // 视图文件夹
  app.set('view cache', !app.DEBUG);
  swig.setDefaults({ cache: false });           // debug模式下关闭视图缓存
  helpers.extend_swig_filters(swig);            // 添加视图filters
};

logger.init_app = function(app) {
  log4js.configure({
    appenders: [
      { type: 'console' },
      {
        type: 'file',
        filename: path.join(app.LOG_DIR, app.APP_NAME + '.log'),
        maxLogSize: app.LOG_MAX_SIZE,
        backups: app.LOG_BACKUPS,
        category: 'default'
      }
    ],
    replaceConsole: true
  });
  _.extend(logger, log4js.getLogger('default'));
};
