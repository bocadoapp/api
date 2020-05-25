import path from 'path'

const { NODE_ENV: ENV, S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env
const isProd = ENV === 'production'
const awsPackage = isProd ? 'aws-sdk' : 'mock-aws-s3'
const AWS = require(awsPackage)

if (isProd) {
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-3'
  })
} else {
  AWS.config.basePath = path.join(__dirname, '../../tmp')
}

const s3 = new AWS.S3({ params: { Bucket: S3_BUCKET_NAME } })

export const upload = async (file: any) =>
  new Promise((resolve, reject) => {
    return s3.upload(
      {
        ACL: 'public-read',
        Bucket: S3_BUCKET_NAME,
        Key: file.filename,
        Body: file.createReadStream(),
        ContentType: file.mimetype
      },
      (err: any, data: any) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      }
    )
  })
