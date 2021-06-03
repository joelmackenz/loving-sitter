const AWS = require("aws-sdk");

exports.uploadImage = (req, res) => {
  if(req.file.size > 1 * 1024 * 1024) {
    return res.status(400).json({
      error: "Please, only upload only image upto 1Mb of size"
    });
  };
  AWS.config.update({ 
    accessKeyId: process.env.IAM_ACCESS_KEY,
    secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY,
    region: process.env.REGION
  });
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    Key: `photo/${req.file.originalname}`
  };

  s3.upload(params, (error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }

    if(data) {
      const locationUrl = data.Location;
      // store locationUrl to database
    }

    return res.status(200).json({ data });
  })
};