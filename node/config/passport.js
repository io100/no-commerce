import passport from 'koa-passport';
import db from '../models/index';
import userService from '../src/services/userService'
import { Strategy } from 'passport-local';

const userService = new userService();

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findOne({where: {id: id}})
    done(null, user)
  } catch (err) {
    throw new Error(err)
  }
})

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {

  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await db.users.findOne({where: {email: email }});

    if (!user) { throw new Error(`${email} doesn't exist.`);  
      return done(null, false);
    }
    
    try {
        const isMatch = await userService.validatePassword(user,password)
        console.log('isMatch', isMatch)
        if (!isMatch) { throw new Error(`${email} typed in the wrong password.`); 
          return done(null, false); 
        }

      done(null, user)
    } catch (err) {

      throw new Error(`Error: ${err}, Email: ${email}`)
      done(err)
    }

  } catch (err) {
    throw new Error(`Error: ${err}, Email: ${email}`)
    return done(err)
  }
}))
