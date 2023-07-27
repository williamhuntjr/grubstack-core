import { GSMode } from 'common/utils/mode/mode.types'
import { IPaginationData, IPaginationParams } from 'common/types'
export interface IMediaLibraryFile {
  id: number
  name: string
  file_size: number
  file_type: string
  url: string
}

export interface IMediaLibraryService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IMediaLibraryFile>>
  uploadFiles(fileList: FileList): Promise<void>
  delete(fileId: string): Promise<void>
}

export interface IMediaLibraryState {
  isLoading: boolean
  mode: GSMode
}
