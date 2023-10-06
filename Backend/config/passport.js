const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const SECRET_KEY = process.env.SECRET_KEY;

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) return done(null, false, { message: 'User was not found' });

      const isMatch = await user.comparePassword(password);

      if (!isMatch) return done(null, false, { message: 'Wrong Password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.user._id);

    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;
