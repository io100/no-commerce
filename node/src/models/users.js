import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../config'

import { TOKEN_EXP_SECONDS } from '../constants/appConstants';
import { capitalizeFirstLetter } from '../utils/utils';

const User = new mongoose.Schema({
  type: { type: String, default: 'User' },
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: String },
  occupation: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zip_code: { type: String },
  phone: { type: String },
  internationalPhone: { type: Boolean },
  status: { type: String, default: 'pending' },
  age: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
  userAcquisition: { type: String }, // Stores the id of the user who referred this user
  meta: { type: String }, // stores arbitrary data that is used for generating UI elements in the frontend
  googleMapsVerified: { type: String }, // is this users address verified by Google Maps API
  role: { type: String, default: 'guest' },
})

User.pre('save', function preSave (next) {
  const user = this
  if (user.isNew) {
    try {
      user.first_name = capitalizeFirstLetter(user.first_name);
      user.last_name = capitalizeFirstLetter(user.last_name);
    } catch (e) {
      console.log('This error means that the name attibutes are wrong')
    }
  }
  user.email = user.email.toLowerCase();
  if (!user.isModified('password')) {
    return next()
  }

  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return reject(err) }
      resolve(salt)
    })
  })
  .then((salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { throw new Error(err) }

      user.password = hash

      next(null)
    })
  })
  .catch(err => next(err))
})

User.methods.validatePassword = function validatePassword (password) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return reject(err) }

      resolve(isMatch)
    })
  })
}

User.methods.generateToken = function generateToken () {
  const user = this
  // TODO: Add role data for a user into the token here
  return jwt.sign({ id: user.id }, config.token, { expiresIn: TOKEN_EXP_SECONDS })
}


export default mongoose.model('user', User)
