'use strict'

import passport from 'koa-passport';
import db from '../../../models/index';


class APIAuthenticationService {
    authUser(ctx) {
        const password = ctx.request.headers['x-nocom-email'];
        const username = ctx.request.headers['x-nocom-password'];
        passport.authenticate('local', ({username: username, password: password}) => {
                    
        if (!user) {
            ctx.throw(401)
        }
  
        })
    }
}