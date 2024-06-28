import { ITablePagination } from 'common/hooks/pagination.hook'
import { IPaginationHookState } from 'common/hooks/pagination.hook'
import { ListActionHandler } from 'common/types/list'

export interface IFilePicker {
  open: boolean
  onClose(): void
  pagination: ITablePagination
  paginationState: IPaginationHookState<any, any>
  onAction: ListActionHandler<any, any>
}
