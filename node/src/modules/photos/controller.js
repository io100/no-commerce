import Photo from '../../models/photos';


const getBucketLocation = require('../../utils/awsS3Api').getBucketLocation;
const asyncUploadFileToS3 = require('../../utils/awsS3Api').asyncUploadFileToS3;


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