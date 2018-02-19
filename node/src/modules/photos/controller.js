import * as attachments from '../../../models/attachments'
import * as to_attachments from '../../../models/to_attachments'
import AWSService from '../../utils/awsS3Api'

/**
 * @api {post} /photo/
 * @apiPermission survey
 * @apiVersion 1.0.0
 * @apiName CreatePhoto
 * @apiGroup Photos
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST localhost:5000/users/:id/photo
 * 
 * 
 *  const data = {
 *    request_type:'base64',
 *    type: "profile-photo",
 *    request_type: "base64",
 *    file_name: file.name.split('.').length >= 2 ? file.name.split('.')[0] : file.name,
 *    file: reader.result
 *   }
 * 
 */


export async function createPhoto(ctx) {
  const base64EncodedImage =  ctx.request.body.data_uri;
  const metaDataStringPosEnd = base64EncodedImage.indexOf('base64');
  const trimmedBase64EncodedImage = base64EncodedImage.substring(metaDataStringPosEnd+7, base64EncodedImage.length-1);
  const imageName = ctx.request.body.name;
  const imageType = ctx.request.body.content_type;
  const imageCategory = ctx.request.body.category;
  const object_id = ctx.request.body.object_id;

  const awsService = new AWSService()

  awsService.asyncUploadFileToS3(trimmedBase64EncodedImage, `no-comm-${Math.ceil(Math.random(0,1000000)*1000000)}-${imageName}`, imageType)
    .then(async (data) => {
      
        try {
          let attachment = await attachments.build({
            type: 'image',
            category: imageCategory,
            value: data.location
          });

          const attachment_id = attachment.id;

          let attachment_lookup =  await to_attachments.build({
            attachment_id: attachment_id,
            object_id: object_id,
            type: imageCategory
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