import { ChangeEvent } from 'react'
import { ListActionHandler } from 'common/types/list'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'

export interface IMediaFileList {
  data: IMediaLibraryFile[]
  onAction: ListActionHandler<IMediaLibraryFile, MediaLibraryAction>
  pages: number
  page: number
  onPageChange(event: ChangeEvent<unknown>, page: number): void
  isPicker?: boolean
}
