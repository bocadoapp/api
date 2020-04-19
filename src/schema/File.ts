import { File, FileTC, IFile } from '../models/File'
import { IResolver } from './'

FileTC.addResolver({
  kind: 'mutation',
  name: 'uploadFile',
  type: FileTC,
  args: {
    type: 'String',
    name: 'String',
    size: 'String',
    file: 'Buffer'
  },
  resolve: async ({ args, context }: IResolver) => {
    console.log('args', args);
    return 'file'
  }
})

export const FileQuery = {
  fileByPath: FileTC.getResolver('findOne')
}

export const FileMutation = {
  uploadFile: FileTC.getResolver('uploadFile')
}