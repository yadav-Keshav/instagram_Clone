const aws = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require("multer-s3");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new aws.S3({
    region, accessKeyId, secretAccessKey,
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'Meta_Data' });
        },
        key: function (req, file, cb) {
            cb(null,Date.now()+'-'+file.originalname)
        },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    })
}).single('post_image');

exports.uploadfile = async (req, res, next) => {
    try {
        upload(req, res, (err)=> {
            if (err) {
                return res.status(400).json({ status: 'fail', message: err.message });
            }
            else {
                return next();
            }
        })
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
}
