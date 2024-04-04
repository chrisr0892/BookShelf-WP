const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const mongoose = require('mongoose');
const userController = require('./server/controllers/userController.js');

const app = express();
const compiler = webpack(webpackConfig);

// Connect to MongoDB
const mongoURI =
  'mongodb+srv://chrisr0892:XuAoZlHDBNGxdYK5@bookstore.rjocmcd.mongodb.net/?retryWrites=true&w=majority&appName=Bookstore';
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use(express.urlencoded());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

// Serve index.html when root URL is accessed
app.get('/', (req, res) => res.status(200).json({}));

// create new user
app.post('/users', userController.createUser, (req, res) =>
  res.status(200).json({ message: 'User created' })
);

// verify user
app.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.found) res.status(200).json({ message: 'User found' });
  else {
    res.status(200).json({ message: 'User not found' });
    // res.redirect('/');
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
