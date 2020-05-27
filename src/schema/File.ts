import { FileTC } from '../models/File'

export const FileQuery = {
  file: FileTC.getResolver('findOne')
}

export const FileMutation = {
  fileRemove: FileTC.getResolver('removeOne'),
  fileRemoveById: FileTC.getResolver('removeById')
}
