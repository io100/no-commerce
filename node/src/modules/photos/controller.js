import Photo from '../../models/photos';


const getBucketLocation = require('../../utils/awsS3Api').getBucketLocation;
const asyncUploadFileToS3 = require('../../utils/awsS3Api').asyncUploadFileToS3;

import { S3_BUCKET_URL, IMGIX_DELIVERY_URL } from '../../constants/appConstants';

import User from '../../models/users';
/**
 * @api {post} /users/:id/photo Create new photo
 * @apiPermission survey
 * @apiVersion 1.0.0
 * @apiName CreatePhoto
 * @apiGroup Photos
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST localhost:5000/users/:id/photo
 */

export async function createPhoto(ctx) {
  const userId = ctx.params.userId;
  ctx.request.body.photo.userId = userId;
  const base64EncodedImage = ctx.request.body.photo.file.base64_data;
  const metaDataStringPosEnd = base64EncodedImage.indexOf('base64');
  const trimmedBase64EncodedImage = base64EncodedImage.substring(metaDataStringPosEnd+7, base64EncodedImage.length-1);
  const imageName = ctx.request.body.photo.file.base64_name;
  const imageType = ctx.request.body.photo.file.base64_content_type;

  await User.findById(userId, async function(err, user) {
    const photo = new Photo(ctx.request.body.photo);
      asyncUploadFileToS3(trimmedBase64EncodedImage, `cw-${Math.ceil(Math.random(0,1000000)*1000000)}-${imageName}`, imageType)
      .then(async (data) => {
        try {
          photo.imageLink = data.Location;
          photo.imageLink.replace(S3_BUCKET_URL, IMGIX_DELIVERY_URL);
          await photo.save();
          addPhotoToSheet(photo, user);

        } catch (err) {
          ctx.throw(422, err.message)
        }
      });
  });
  const response = 200;
  // photo.toJSON()
  ctx.body = {
    photo: ctx.request.body.photo,
  }
}


/**
 * @api {get} /photos Get all photos
 * @apiPermission survey
 * @apiVersion 1.0.0
 * @apiName GetPhotos
 * @apiGroup Photos
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:5000/photos
 *
 * @apiSuccess {Object[]} photo           Array of user photo objects
 * @apiSuccess {ObjectId} photo._id       Photo id
 * @apiSuccess {String}   photo.title      Photo title
 * @apiSuccess {Object[]}   photo.category    Photo category
 *
 */
export async function getPhotos (ctx) {
  const photos = ctx.request.query.pending === 'true' ?
    await Photo.find({ status: 'pending' }, '-password') :
    await Photo.find({}, '-password');

  ctx.body = { photos }
}

export async function getPhotosByUserId (ctx) {
  const userId = ctx.params.userId;
  const photos = await Photo.find({ userId });
  ctx.body = { photos }
}


export async function acceptPhoto (ctx) {
  try {
    const photo = await Photo.findById(ctx.params.id, '-password')
    if (!photo) {
      ctx.throw(404)
    }

    await User.findById(photo.userId, async function(err, user) {
      photo.status = 'accepted';
      await photo.save();
      addPhotoToAcceptedSheet(photo, user);
      removePhotoFromPendingSheet(photo);
      ctx.body = {
        photo
      }
    });
    const response = 200;
    // photo.toJSON()
    ctx.body = {
      photo: ctx.request.body.photo,
    }

  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }
}

export async function rejectPhoto (ctx) {
  try {
    const photo = await Photo.findById(ctx.params.id, '-password')
    if (!photo || photo.status === 'accepted') {
      ctx.throw(404)
    }

    await User.findById(photo.userId, async function(err, user) {
      photo.status = 'rejected';
      await photo.save();
      addPhotoToRejectedSheet(photo, user);
      removePhotoFromPendingSheet(photo, user);
      ctx.body = {
        photo
      }
    });

  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }
}
