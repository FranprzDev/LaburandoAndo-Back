const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user.model');
const { comparePassword } = require('../common/functions');
require('dotenv').config()



passport.use('login', new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'password'
}, async (mail, password, done) => {
  try {
      const user = await User.findOne({ mail });

      if(!user){
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await comparePassword(password, user.password);

      if(!isValid){
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user, { message: 'Inicio de sesión exitoso' });
  } catch (error) {
      return done(error);
  }
}));

const serializeUser = function (user, cb) {
  cb(null, user.id);
}

const deserializeUser = async function (mail, cb) {
  try {
      const user = await User.findOne( mail );
      cb(null, user);
  } catch (error) {
      done(error);
  }
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;