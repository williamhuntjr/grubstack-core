import { IListAction } from 'common/list.types'

export interface IGrubListItem {
  label: string
  value: string
}
export interface IGrubList {
  subHeader?: string
  data: IGrubListItem[]
  onClickAdd: () => void
  onClickDelete(value: string): void
  className?: string
  actions?: IListAction[]
}