import { ChangeEvent } from 'react'
import { ICardListItem } from 'common/components/card-list/card-list.types'

export interface IQuickPicker {
  open: boolean
  onClose: () => void
  title?: string
  data: ICardListItem[]
  currentPage: number
  pages: number
  onClick(data: ICardListItem): void
  onPageChange(event: ChangeEvent<unknown>, newPage: number): void
}

export interface IQuickPickerItem extends ICardListItem {}
