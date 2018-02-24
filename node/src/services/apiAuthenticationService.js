'use strict'

import passport from 'koa-passport';
import db from '../../../models/index';
import userService from './userService';


class APIAuthenticationService {
   authUser(ctx) {
       return new Promise(async(resolve, reject) => {
            const password = ctx.request.headers['X-Nocom-Email'] ? ctx.request.headers['x-nocom-email']  : null;
            const username = ctx.request.headers['X-Nocom-Password'] ? ctx.request.headers['x-nocom-password'] : null;
            const api_key = ctx.request.headers['X-Nocom-Key'] ? api_key = ctx.request.headers['X-Nocom-Key'] : null;

            if(api_key) {
                const todaysDate = Date.now();
                const isMatch = await db.api_keys.findOne({where: {api_key: api_key, expires: {gte: todaysDate}}});

                if(!isMatch) {
                    reject('Invalid or Expired API key.');
                }

                return resolve()

            } else if (password && username) {
                passport.authenticate('local', ({username: username, password: password}) => {
                        
                    if (!user) {
                        reject('Unauthorized');
                    }
                    
                    resolve();
                })
            } else {
                reject('Ensure either Username / Password headers exist or API Key headers exist for authentication.')
            }
            
        })
    }
}


export default APIAuthenticationService;