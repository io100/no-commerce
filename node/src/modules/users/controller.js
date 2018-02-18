import postmark from 'postmark';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../../../models/users';
import { isJsonString } from '../../utils/utils';
import acl from '../auth/permissions';




/**
 * @api {delete} /users/:id Delete a user
 * @apiPermission
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X DELETE localhost:5000/users/56bd1da600a526986cf65c80
 *
 * @apiSuccess {StatusCode} 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiUse TokenError
 */

export async function deleteUser (ctx) {
  const user = ctx.body.user

  await user.remove()

  ctx.status = 200
  ctx.body = {
    success: true
  }
}


export async function changePassword(ctx) {
  const newPassword = ctx.request.body.newPassword;
  const newPasswordConfirm = ctx.request.body.newPasswordConfirm;

  if (newPassword !== newPasswordConfirm) {
    throw new Error('Password and confirm password do not match');
  }

  const user = await User.findOne({where: {id:ctx.params.id}});

  user.password = newPassword;

  await user.save();
  ctx.body = {
    user
  }
}

/*
* Route for handling users who have forgotten their passwords:
* -Generating reset password token
* -Sending forgot password email with link that has expiring token.
*
* @api {post} /users/forgot-password
* Params:
*  -email
*/

export async function forgotPassword(ctx, next) {

  await new Promise(async (resolve, reject) => {
    await crypto.randomBytes(20, (err, buf) => {
      const token = buf.toString('hex');
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  }).then(async (token) => {
    const user = await User.findOne({where: {email: ctx.request.body.email }});
    console.log(`A reset password token has been generated for ${user.email}`);

    if (!user) {
      // We send only a 404 case the user is not found.
      // Might as well obfuscate as much as possible since its a password reset service
      console.log(`A forgot password attempt has been made for a user that was not found ${ctx.request.body.email}.  No user will receive a reset password token.`);

      ctx.throw(404);
      ctx.body = {
        status: 404
      }

    }

    //@TODO:  For better security, we should save these tokens in a different table with their hash as the ID
    // Then, the user tries to reset password via a link with the hashed token, we can use the hashed token
    // to lookup a record in the reset password table , decode hashed token on the server, and see if the table value
    // matches the decoded ID that was sent.
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const client = new postmark.Client("");

    if (!client.sendEmailWithTemplate) {
      ctx.throw(500, 'Email client failed.');
    }

    ctx.body = {
      message: 'Forgot password email sent successfully',
      email: ctx.request.body.email
    }


  }).catch((err) => {
    console.log(`There was a problem generating a reset token for user ${ctx.request.body.email}`, err);
    ctx.throw(500, 'Forgot password error:', err);
  })

}

/*
* Checks if a user with the given resetToken exists and is not expired
* We will use the response from this request in order to check if we should even render the form for resetting
*/
export async function canUserResetPasword(ctx) {
  const user = await User.findOne({ resetPasswordToken: ctx.request.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } }, '-password');
  if (!user) {
    ctx.throw(404);
  }
  ctx.body = {
    message: 'Valid password reset token'
  }
}

/*
* Resets password for the user, if they have the correct non-expired token
* @api {post} /users/reset-password
*
* Params:
* resetPasswordToken
* password
*/

export async function resetPassword(ctx) {
  const user = await User.findOne({ resetPasswordToken: ctx.request.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } }, '-password');
  if (!user) {
    ctx.throw(404);
  }
  user.password = ctx.request.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  ctx.body = {
    massage: 'Password successfully reset'
  }
}


export async function checkUserRole(ctx) {
  try {
    const roles = await acl.userRoles(ctx.params.id);
  } catch (err) {
    ctx.throw(500, err);
  }
  ctx.body = {
    roles,
  };
}

export async function updateRole(ctx) {

  const id = ctx.request.body.id
  const role = ctx.request.body.role

  const user = await User.findByOne({where: {id: id}})

  user.role = role;

  const saved = await user.save()

  ctx.body = {
    saved
  }
}
