const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const mongoose = require('mongoose');
const User = require('./server/models/userModel.js');

const app = express();
const compiler = webpack(webpackConfig);

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
app.get('/', (req, res) => {
  res.status(200).json({});
});
// app.get('/test', (req, res) => {
//   res.status(200);
//   res.send('Hello');
//   console.log('i work');
// });
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
