import apiAuthenticationService from '../services/apiAuthenticationService';
import {config} from 'dotenv';

const authService = new apiAuthenticationService();
const api_protection = process.env.API_AUTHENTICATION
config();

export async function ensureUser (ctx, next) {
    if(!api_protection) {
      return next(ctx);
    }
    try {
      const result = await apiAuthenticationService.authUser(ctx);
      return next(ctx);
    } catch (err) {
      ctx.status = 401;
      ctx.throw(err);
    }
}