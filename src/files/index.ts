import path from 'path'

const BUCKET_NAME = 'bocado'
const isProd = process.env.NODE_ENV === 'production'
const awsPackage = isProd ? 'aws-sdk' : 'mock-aws-s3'
const AWS = require(awsPackage)

if (isProd) {
  AWS.config.update({region: 'REGION'})
} else {
  AWS.config.basePath = path.join(__dirname, '../../tmp')
}

const s3 = new AWS.S3({ params: { Bucket: BUCKET_NAME }})

export const upload = async (file: any) =>
  new Promise ((res, rej) =>
    s3.upload(
      { Bucket: BUCKET_NAME, Key: file.filename, Body: file.createReadStream() },
      (err: any, data: any) => {
        if (err) {
          return rej(err)
        }
        return res(data)
      }
    )  
  )