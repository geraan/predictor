require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const webpack = require('webpack');
const bodyParser = require('body-parser');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('../webpack.dev.config.js');
const router = require('./router');
const db = require('./db');

const app = express();
app.use(morgan('combined'));
// const compiler = webpack(webpackConfig);

// initialize middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath
// }));

app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: true,}));
app.use(express.static('public'));

db.connect(process.env.DB_URL, (err) => {
  if (err) return console.error(err);
  router(app);
  app.listen(process.env.PORT, () => {
    console.log('server started');
  });
});