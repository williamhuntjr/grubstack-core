import { ChangeEvent } from 'react'
import { IListAction } from 'common/list.types'
import { ListActionHandler } from 'common/list.types'
import { IMediaLibraryFile } from '../media-library.types'

export interface IMediaFileList {
  data: IMediaLibraryFile[]
  actions: IListAction[]
  onAction: ListActionHandler<IMediaLibraryFile, IListAction> | undefined
  pages: number
  page: number
  onPageChange(event: ChangeEvent<unknown>, page: number): void

}