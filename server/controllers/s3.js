const AWS = require("aws-sdk");

const { addImageUrls } = require("./profile");

AWS.config.update({ 
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

exports.uploadImage = (req, res) => {
  const s3 = new AWS.S3();

  let locationUrls = [];

  const fieldNames = ['background', 'profile'];

  for (let index = 0; index < fieldNames.length; index++) {
    const fieldName = fieldNames[index];
    const file = req.files[fieldName];
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Body: file[0].buffer,
      ContentType: file[0].mimetype,
      Key: `${req.user.id}/${file[0].fieldname}`,
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
        locationUrls.push({ locationUrl, key: data.key });
        if (locationUrls.length === fieldNames.length) {
          req.body.coverImg = locationUrls[0].locationUrl;
          req.body.profileImg = locationUrls[1].locationUrl;

          addImageUrls(req, res);
        }
      }
    })
  }

};
