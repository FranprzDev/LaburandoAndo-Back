const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user.model');
const { comparePassword } = require('../common/functions');
const { JWT_SECRET } = require('../common/constants');
const JwtStrategy = require('passport-jwt/lib/strategy');
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config()

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({ mail: jwt_payload.sub });

    if(!user){
      return done(null, false, { message: 'Credenciales invalidas.' });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error)
  }
}))

const serializeUser = function (user, cb) {
  cb(null, { ok: "ok" });
}

const deserializeUser = async function (token, cb) {
  cb(null, token);
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;