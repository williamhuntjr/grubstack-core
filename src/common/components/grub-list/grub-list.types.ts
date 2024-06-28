import { ChangeEvent } from 'react'
import { IListAction, ListActionHandler } from 'common/types/list'

export interface IGrubListItem {
  label: string
  value: string
}
export interface IGrubList {
  subHeader?: string
  data: IGrubListItem[]
  onClickAdd?: () => void
  onAction?: ListActionHandler<IGrubListItem, IListAction>
  className?: string
  actions?: IListAction[]
  disabled?: boolean
  addLabel?: string
  page?: number
  pages?: number
  onPageChange?(event: ChangeEvent<unknown>, page: number): void
}
