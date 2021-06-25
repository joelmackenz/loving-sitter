const AWS = require("aws-sdk");

const { addImageUrls } = require("./profile");

AWS.config.update({ 
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

exports.uploadImage = (req, res) => {
  const s3 = new AWS.S3();

  let locationUrls = {};

  const entries = Object.entries(req.files);
  for (let index = 0; index < entries.length; index++) {
    const fieldName = entries[index];
    const file = fieldName[1][0];
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Body: file.buffer,
      ContentType: file.mimetype,
      Key: `${req.user.id}/${file.fieldname}`,
      ACL: 'public-read',
    };
    s3.upload(params, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(error.status).json({
          error: `${error.message}`
        });
      }
  
      if(data) {
        // store locationUrl in Database;
        const locationUrl = data.Location;
        locationUrls[data.key] = locationUrl;
        if (Object.entries(locationUrls).length === entries.length) {
          console.log("locationUrls ", locationUrls);
          req.body.coverImg = locationUrls[`${req.user.id}/background`];
          req.body.profileImg = locationUrls[`${req.user.id}/profile`];

          addImageUrls(req, res);
        }
      }
    })
  }

};
