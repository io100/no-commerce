const aws = require('aws-sdk');
const S3 = new aws.S3({ signatureVersion: 'v4' });

const bucketName = process.env.S3_BUCKET_NAME;
module.exports = {

  getBucketLocation: function() {
    const params = {
      Bucket: bucketName
     };
     S3.getBucketLocation(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
       return data;
     });
  },

  //@TODO Remove default location parameter as `uploads/images/`, fix all instances that require this path to pass it in
  asyncUploadFileToS3: function(base64String, fileName, contentType, location = 'uploads/images/') {
    return new Promise((resolve) => {
      var params = {
          'ACL': 'public-read',
          'Bucket': bucketName,
          'Key': location + fileName,
          'Body': new Buffer(base64String, 'base64'),
          'ContentEncoding': 'base64',
          'ContentType': contentType
       };

       S3.upload(params, function(err, data){
          resolve(data);
       });
    })

  }
}
