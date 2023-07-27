import { ITablePagination } from 'common/hooks/pagination.hook'
import { IPaginationHookState } from 'common/hooks/pagination.hook'
import { ListActionHandler } from 'common/list.types'

export interface IFilePicker {
  open: boolean
  onClose(): void
  pagination: ITablePagination
  paginationState: IPaginationHookState<any>
  onAction: ListActionHandler<any, any>
}