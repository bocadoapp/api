import { readFileSync } from 'fs'
import { join } from 'path'
import { Document, Schema, model } from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import { IResolver } from '../../schema'
import { upload } from '../../files'

export interface IFile {
  type: string,
  mimtype: string,
  size?: number,
  name: string,
  url?: string,
  path?: string,
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
  path: String
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

export const FileResolver = {
  name: 'upload',
  type: FileTC,
  args: {
    file: 'Upload'
  },
  resolve: async ({ source, args, context, info }: IResolver) => {
    // pillo el metodo createReadStream
    const file = await args.file

    // Crido la pujada a s3
    await upload(file)

    // creo instancia del model File
    const dbFile = new File({
      mimetype: file.mimetype,
      type: file.mimetype.split('/')[1],
      name: file.filename
    })

    // guardo a db
    await dbFile.save()
    return dbFile
  }
}
