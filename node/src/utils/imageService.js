import Jimp from 'jimp';
const asyncUploadFileToS3 = require('./awsS3Api').asyncUploadFileToS3;

/**
* Takes a (trimmed) base64 string of an image, crops it according to dimensions, uploads the image to S3
* @param {base64} string base64 image string (with the 'base64,' prefix trimmed off)
* @param {fileName} string name of file to create in s3 bucket
* @param {imageType} string MIME type of the image (i.e. image/png or image/jpeg)
* @param {cropData} object { x, y, w, h }
*
* @returns <Promise:S3UploadResponse> (This response has a `Location` property with the URL of the uploaded image)
*/
export const cropAndUploadBase64ImageToS3 = (base64, fileName, imageType, cropData) => {
  return new Promise((resolve, reject) => {
    if(!cropData) {
      resolve(asyncUploadFileToS3(base64, fileName, imageType));
    }

    const uncroppedImageBuffer = new Buffer(base64, 'base64');
    Jimp.read(uncroppedImageBuffer, function (err, image) {
      if (err) {
        console.log('Read error');
        reject(err);
        return;
      }
      image.crop(cropData.x, cropData.y, cropData.w, cropData.h, (err, image) => {
        if (err) {
          console.log('Crop error');
          reject(err);
          return;
        }
        image.getBase64(imageType, (err, croppedBase64) => {
          if (err) {
            console.log('getBase64 error')
            reject(err);
            return;
          }
          const metaDataStringPosEnd = croppedBase64.indexOf('base64') + ('base64'.length+1);
          const trimmedBase64EncodedImage = croppedBase64.substring(metaDataStringPosEnd);
          resolve(asyncUploadFileToS3(trimmedBase64EncodedImage, fileName, imageType));
        });
      });
    });
  });
}
