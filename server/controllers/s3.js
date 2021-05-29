const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({ 
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

exports.s3Storage = (req, res) => {
    const s3 = AWS.S3();
    const params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `photo/${req.file.originalname}`
    }

    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error occured while trying to upload to S3 bucket', err);
        }

        if(data) {
            fs.unlinkSync(req.file.path); // Empty temp folder
            const locationUrl = data.Location;
            // locationUrl to database
        }
    })
}