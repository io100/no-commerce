'use strict'

import passport from 'koa-passport';
import db from '../../../models/index';
import userService from './userService';


class APIAuthenticationService {
   authUser(ctx) {
       return new Promise(async(resolve, reject) => {
            if(api_key) {
                const todaysDate = Date.now();
                const isMatch = await db.api_keys.findOne({where: {api_key: api_key, expires: {gte: todaysDate}}});

                if(!isMatch) {
                    reject('Invalid or Expired API key.');
                }

                return resolve(0)

            } else if (password && username) {
                passport.authenticate('local', (user) => {
                        
                    if (!user) {
                        reject('Unauthorized');
                    }
                    
                    return resolve(user);
                })
            } else {
                reject('Ensure either Username / Password headers exist or API Key headers exist for authentication.')
            }
            
        })
    }
}


export default APIAuthenticationService;