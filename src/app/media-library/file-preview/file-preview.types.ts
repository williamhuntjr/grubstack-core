import { GSMode } from 'common/utils/mode/mode.types'
import { IMediaLibraryFile } from '../media-library.types'

export interface IFilePreview {
  data: IMediaLibraryFile
  mode: GSMode
  onDelete(): void
}