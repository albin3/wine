var path = require('path');

/**
 * 应用根目录
 *
 * @property root_dir
 * @type String
 * @final
 */
var root_dir = __dirname;

/**
 * 通用配置
 *
 * @property default_config
 * @type Object
 * @final
 */
var default_config = {
  APP_NAME: 'Application',
  SECRET_KEY: 'My Secret Key',
  DEBUG: false,
  TESTING: false,
  PORT: 3000,
  DB_URI: null,

  MODULES: [ 'account' ],
  STATIC_ROUTER: '/static',
  ROOT_DIR: root_dir,
  MODULE_DIR: path.join(root_dir, 'modules'),
  TEMPLATE_DIR: path.join(root_dir, 'templates'),
  STATIC_DIR: path.join(root_dir, 'static'),
  UPLOAD_DIR: path.join(root_dir, 'static', 'upload'),
  
  LOG_MAX_SIZE: 204800,
  LOG_BACKUPS: 10,
  LOG_DIR: path.join(root_dir, 'log'),

  SESSION_COOKIE_NAME: null,
  SESSION_COOKIE_DOMAIN: null,
  SESSION_COOKIE_PATH: null,
  SESSION_COOKIE_HTTPONLY: true,
  SESSION_COOKIE_SECURE: false,
  USE_X_SENDFILE: true
};

/**
 * @class Config
 * @constructor
 * @param {Object} extend
 */
function Config(extend) {
  var self = this;
  Object.keys(default_config).forEach(function(k) {
    self[k] = default_config[k];
  });
  Object.keys(extend).forEach(function(k) { self[k] = extend[k]; });
}

/**
 * 开发环境
 *
 * @property development
 * @type Object
 * @final
 */
exports.development = new Config({
  APP_NAME: 'node-skeleton',
  DEBUG: true,
  PORT: 3001,
  DB_URI: 'mongodb://localhost/skeleton_dev'
});

/**
 * 测试环境
 *
 * @property development
 * @type Object
 * @final
 */
exports.testing = new Config({
  APP_NAME: 'node-skeleton',
  DEBUG: true,
  PORT: 3001,
  DB_URI: 'mongodb://localhost/skeleton_test'
});

/**
 * 生产环境
 *
 * @property development
 * @type Object
 * @final
 */
exports.production = new Config({
  APP_NAME: 'node-skeleton',
  DEBUG: false,
  PORT: 80,
  DB_URI: 'mongodb://localhost/skeleton'
});
