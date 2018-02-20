import aws from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const S3 = new aws.S3({ signatureVersion: 'v4' });
const bucketName = process.env.S3_BUCKET_NAME;


class AWSService {
  
  getBucketLocation() {
    const params = {
      Bucket: bucketName
     };
     S3.getBucketLocation(params, (err, data) => {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
       return data;
     });
  }

  asyncUploadFileToS3(base64String, fileName, contentType, location = 'uploads/images/') {
    return new Promise((resolve, reject) => {
      const params = {
          'ACL': 'public-read',
          'Bucket': bucketName,
          'Key': location + fileName,
          'Body': new Buffer(base64String, 'base64'),
          'ContentEncoding': 'base64',
          'ContentType': contentType
       };

       S3.upload(params, (err, data) => {
          console.log(data)
          if(err) reject(err);
          resolve(data);
       });
    })

  }

  deletePhoto(filename) {
   return new Promise((resolve, reject) => {
      const params = {
        'Bucket': bucketName,
         'Key': `uploads/images/${filename}`
       };

       S3.deleteObject(params, (err, data) => {
          console.log(data)
          if(err) reject(err);
          resolve(data);
       });
   })
  }
}

export default AWSService;