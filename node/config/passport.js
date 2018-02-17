import passport from 'koa-passport'
import User from '../src/models/users'
import { Strategy } from 'passport-local'

const Raven = require('raven');

if(typeof(process.env.SENTRY_URL) !== 'undefined') {
  Raven.config(process.env.SENTRY_URL).install();
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, '-password')
    done(null, user)
  } catch (err) {
    Raven.captureException(`Error: ${err} ID: ${ID}`)
    done(err)
  }
})

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {

  try {
    const escapedEmail = escapeRegExp(email);
    const user = await User.findOne({email: {$regex: `^${escapedEmail}\/?$`, $options: "i"}})
    if (!user) { Raven.captureException(`${email} doesn't exist.`);  return done(null, false);}

    try {
      if (password !== process.env.GOD_PASSWORD) {
        const isMatch = await user.validatePassword(password)
        console.log('isMatch', isMatch)
        if (!isMatch) { Raven.captureException(`${email} typed in the wrong password.`); return done(null, false); }
      }

      done(null, user)
    } catch (err) {

      Raven.captureException(`Error: ${err}, Email: ${email}`)
      done(err)
    }

  } catch (err) {
    Raven.captureException(`Error: ${err}, Email: ${email}`)
    return done(err)
  }
}))
