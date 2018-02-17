import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import session from 'koa-generic-session'
import passport from 'koa-passport'
import mount from 'koa-mount'
import serve from 'koa-static'
import cors from 'kcors';
import config from '../config'
import { errorMiddleware } from '../src/middleware'
import services from '../src/services/services';

const Raven = require('raven');
if(process.env.SENTRY_URL !== null) {
  Raven.config('').install();
}


const app = new Koa()
app.keys = [config.session]

mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(cors());
app.use(convert(logger()))
app.use(async (ctx, next) => {
  if (ctx.path.indexOf('file-upload')) ctx.disableBodyParser = true;
  await next();
});
app.use(bodyParser({
  jsonLimit: '10mb',
}))
app.use(session())
app.use(errorMiddleware())

app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))))

require('../config/passport')

app.use(passport.initialize())
app.use(passport.session())

const modules = require('../src/modules')

modules(app)

app.on('error', (err) => {
  console.log('The application has captured a generic error which has been logged to sentry', err);
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});


process
  .on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection at Promise', reason);
  })
  .on('uncaughtException', (err) => {
    console.log('An exception went uncaught somewhere in the application', err);
    process.exit(1);
  });


export default app
