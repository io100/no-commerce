import apiAuthenticationService from '../services/apiAuthenticationService'


export async function ensureUser (ctx, next) {
  const authService = new apiAuthenticationService();

  try {
    const result = await apiAuthenticationService.authUser(ctx);
    return next(ctx);
  } catch (err) {
    ctx.status = 401;
    ctx.throw(err);
  }
}