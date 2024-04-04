const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.locals.user = user;
    console.log('user created');
    console.log(user);
    return next();
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
    next(error);
  }
};
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      res.locals.found = false;
    } else {
      res.locals.found = true;
      res.locals.user = user; // Add the user object to res.locals
      console.log('user found');
      console.log(user.id);
    }

    return next();
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'Error verifying user' });
    next(error);
  }
};
// userController.userProfile = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email, password });
//     if (!user) res.locals.found = false;
//     else {
//       res.locals.found = true;
//       res.locals.user = user;
//     }
//     console.log(user);
//     console.log('user found');
//     return next();
//   } catch (error) {
//     console.error('Error verifying user:', error);
//     res.status(500).json({ message: 'Error verifying user' });
//     next(error);
//   }
// };

module.exports = userController;
