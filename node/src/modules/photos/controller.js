import db from '../../../models/index'
import AWSService from '../../utils/awsS3Api'

/**
 * @api {POST} /photo/
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

const awsService = new AWSService();


export async function createPhoto(ctx) {
  const base64EncodedImage =  ctx.request.body.data_uri;
  const metaDataStringPosEnd = base64EncodedImage.indexOf('base64');
  const trimmedBase64EncodedImage = base64EncodedImage.substring(metaDataStringPosEnd+7, base64EncodedImage.length-1);
  const imageName = ctx.request.body.name;
  const imageType = ctx.request.body.content_type;
  const imageCategory = ctx.request.body.category;
  const object_id = ctx.request.body.object_id;
  
  const data = await awsService.asyncUploadFileToS3(trimmedBase64EncodedImage, `no-comm-${Math.ceil(Math.random(0,1000000)*1000000)}-${imageName}`, imageType);

  try { 

      let attachment = await db.attachments.create({
        type: 'image',
        category: imageCategory,
        value: data.Location
      });

      let attachment_lookup =  await db.to_attachments.create({
        attachment_id: attachment.id,
        object_id: object_id,
        type: imageCategory
      });

    } catch (err) {
      ctx.throw(422, err.message)
    }

  ctx.body = {
    photo: data.Location
  }

}

/**
 * @api {DELETE} /photo/
 * @apiVersion 1.0.0
 * @apiName Delete Photo
 * @apiGroup Photos
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X DELETE localhost:5000/photo
 * 
 * 
 *  const data = {
 *    url: saved_photo_url
 *    OR
 *    id: photo_id 
 *  }
 * 
 */

export async function deletePhoto(ctx) {
  const filename =  ctx.request.body.url.split('/').slice(-1);

  try { 

     const data = await awsService.deletePhoto(filename);
     const deleteFromAttachments = await db.attachments.destroy({where: {value: filename}});
     const deletedFromToAttachments = await db.to_attachments.destroy({where: {attachment_id: deletedFromAttachments.id}});

    } catch (err) {
      ctx.throw(422, err.message)
    }

  ctx.body = {
    status: 'deleted',
    photo: deletedFromAttachments.value
  }
}