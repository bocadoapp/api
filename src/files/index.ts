import AWSMock from 'mock-aws-s3'
import path from 'path'

AWSMock.config.basePath = path.join(__dirname, '../../tmp')
const s3 = new AWSMock.S3({ params: { Bucket: 'bocado' } })

export const upload = async (file: any) =>
  new Promise((resolve, reject) =>
    s3.upload(
      { Bucket: 'bocado', Key: file.filename, Body: file.createReadStream() },
      (err: any, data: any) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      }
    )
  )
