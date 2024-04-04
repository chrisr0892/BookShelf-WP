const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const mongoose = require('mongoose');
const userController = require('./server/controllers/userController.js');
const User = require('./server/models/userModel.js');

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
  res.status(200).json({ message: 'User created', user: res.locals.user })
);

// verify user
app.post('/login', userController.verifyUser, (req, res) => {
  if (res.locals.found) res.status(200).json({ message: 'User found', user: res.locals.user });
  else {
    res.status(200).json({ message: 'User not found' });
  }
});
// User Profile user
app.get('/users/:id', async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rendering Profile' });
  }
});

// Update Password
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating password' });
  }
});
// Delete User
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    User, deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating password' });
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
