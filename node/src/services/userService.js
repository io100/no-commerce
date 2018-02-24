import db from '../../../models/index';
import {capitalizeFirstLetter} from '../utils/utils'
import bcrypt from 'bcrypt';

class userService {
   async saveUser(user) {
       return new Promise((resolve, reject) => {
            try {
                user.email = user.email.toLowerCase();
                const doesUserExist = await db.users.findOne({where: {email: user.email}});
            } catch (err) {
                reject('The user object requires an email address.')
            }
            
            if (!doesUserExist) {
                try {
                    user.first_name = capitalizeFirstLetter(user.first_name);
                    user.last_name = capitalizeFirstLetter(user.last_name);
                } catch (err) {
                    reject('The user object requires both a first name and a last name.')
                }
            }

            const salt = await getSalt()

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { reject(err) }
                user.password = hash
            })

            try {
                const newUser = await db.users.create(...user)
                resolve(newUser)
            } catch (err) {
                reject(err)
            }
        })
    }

    getSalt() {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) { reject(err) }
                resolve(salt);
            })
        })
    }

    validatePassword (user,password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return reject(err) }
                resolve(isMatch)
            })
        })
    }

    generateToken (user) {
        // TODO: Add role data for a user into the token here
        return jwt.sign({ id: user.id }, config.token, { expiresIn: TOKEN_EXP_SECONDS })
    }
        
}
    

  

