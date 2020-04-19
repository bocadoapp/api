import { FileTC } from '../models/File'

export const FileQuery = {
  file: FileTC.getResolver('findOne')
}