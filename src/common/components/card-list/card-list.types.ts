import { ChangeEvent } from 'react'
import { IListAction, ListActionHandler, onClickListHandler } from 'common/types/list'

export interface ICardListItem {
  name: string
  description: string
  thumbnail_url: string
  render?: JSX.Element
}

export interface ICardList<TData extends ICardListItem, Action> {
  data: TData[]
  onAction?: ListActionHandler<TData, Action>
  onClick?: onClickListHandler<TData>
  actions?: IListAction[]
  pages: number
  page: number
  onPageChange(event: ChangeEvent<unknown>, page: number): void
  layout?: 'horizontal' | 'vertical'
  cols?: 2 | 4 | 5
  buttonStyle?: 'outlined' | 'contained' | 'text'
  buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}
