import { ChangeEvent } from 'react'
import { IListAction, ListActionHandler } from 'common/list.types'

export interface IIconCardListItem {
  id?: string
  name: string
  description: string
  thumbnail_url: string
}

export interface IIconCardList<TData extends IIconCardListItem, Action> {
  data: TData[]
  onAction: ListActionHandler<TData, Action>
  actions: IListAction[]
  pages: number
  page: number
  onPageChange(event: ChangeEvent<unknown>, page: number): void
}