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
}