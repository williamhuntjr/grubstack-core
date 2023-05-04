import { GSMode } from 'common/utils/mode/mode.types'

export interface IMediaLibraryFile {
  name: string
  filename: string
  filesize: number
  url: string
  id: number
}

export interface IMediaLibraryService {
  getAll(): Promise<void>
}

export interface IMediaLibraryState {
  isLoading: boolean
  mode: GSMode
}