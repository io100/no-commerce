import * as attachments from '../../../models/attachments'
import * as to_attachments from '../../../models/to_attachments'
import { getBucketLocation } from '../../utils/awsS3Api'
import { asyncUploadFileToS3 } from '../../utils/awsS3Api'

/**
 * @api {post} /photo/
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
  const base64EncodedImage =  ctx.request.body.base64_data;
  const metaDataStringPosEnd = base64EncodedImage.indexOf('base64');
  const trimmedBase64EncodedImage = base64EncodedImage.substring(metaDataStringPosEnd+7, base64EncodedImage.length-1);
  const imageName = ctx.request.body.base64_name;
  const imageType = ctx.request.body.base64_content_type;
  const imageCatatony = ctx.request.body.category;

  asyncUploadFileToS3(trimmedBase64EncodedImage, `no-comm-${Math.ceil(Math.random(0,1000000)*1000000)}-${imageName}`, imageType)
    .then(async (data) => {
        try {
        
          let attachment = attachments.build({

          });

          let attachment_lookup = to_attachments.build({

          });

          attachment = await attachment.save();
          attachment_lookup = await attachment_lookup.save();

        } catch (err) {
          ctx.throw(422, err.message)
        }
  });
  const response = 200;

  ctx.body = {
    photo: ctx.request.body.photo,
  }
}