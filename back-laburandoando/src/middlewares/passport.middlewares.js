const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user.model');
const { comparePassword } = require('../common/functions');
require('dotenv').config()



passport.use(new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'password'
}, async (mail, password, done) => {
  try {
      const user = await User.findOne({ mail });
      if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, user);
  } catch (err) {
      return done(err);
  }
}));

const serializeUser = function (user, cb) {
  cb(null, user.id);
}

const deserializeUser = async function (id, cb) {
  try {
      const user = await User.findOne({ where: { id } });
      cb(null, user);
  } catch (error) {
      done(error);
  }
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;