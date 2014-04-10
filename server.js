var env = process.env.NODE_ENV || 'development',
    config = require('./config')[env],            // configuration
    create_app = require('./application').create_app;

// 实例化应用
var app = create_app(config);

// 启动应用实例
var port = app.PORT || 3000;
app.listen(port, function() {
  console.info('Application running on port %d.'.green, port);
  console.info('You can now visit '.green +
               'http://localhost:3001/'.underline.blue +
               ' via your browser.'.green);
});
