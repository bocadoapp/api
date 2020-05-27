import { readFileSync } from 'fs'
import { join } from 'path'
import { Document, Schema, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { IResolver } from '../../schema'
import { remove, upload } from '../../files'

export interface IFile {
  type: string,
  mimtype: string,
  size?: number,
  name: string,
  url?: string,
  path?: string,
  key?: string
}

export type TFile = IFile & Document

const FileSchema: Schema = new Schema({
  type: {
    required: true,
    type: String
  },
  mimetype: String,
  name: {
    required: true,
    type: String
  },
  size: Number,
  url: String,
  path: String,
  key: String
})

FileSchema.virtual('data').get(function () {
  if (process.env.NODE_ENV === 'production') {
    return ''
  }
  return `data:${this.mimetype};base64,` + readFileSync(join(__dirname, `../../../tmp/bocado/${this.name}`), 'base64')
})

const File = model<TFile>('File', FileSchema)

export const FileTC = composeWithMongoose(File, {})
FileTC.addFields({ data: { type: 'String' } })

FileTC.wrapResolverResolve('removeOne', next => async rp => {
  const file = await File.findOne({ _id: rp.args.filter._id })

  if (file && file.key) {
    await remove(file.key)
  }

  return next(rp)
})

export const FileResolver = {
  name: 'upload',
  type: [FileTC],
  args: {
    files: '[Upload]'
  },
  resolve: async ({ source, args, context, info }: IResolver) => {
    // pillo el metodo createReadStream
    const files = await Promise.all(args.files)
    const savedFiles = []
    for (const i in files) {
      const file: any = files[i]

      // Crido la pujada a s3
      const { Location: url, key }: any = await upload(file)

      // creo instancia del model File
      const dbFile = new File({
        mimetype: file.mimetype,
        type: file.mimetype.split('/')[1],
        name: file.filename,
        url,
        key
      })

      // guardo a db
      const insertedFile = await dbFile.save()
      savedFiles.push(insertedFile)
    }

    return savedFiles
  }
}
