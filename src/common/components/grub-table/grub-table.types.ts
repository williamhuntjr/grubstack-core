import { PropsWithChildren, ChangeEvent } from 'react'
import { OverridableStringUnion } from '@mui/types'
import { TableCellProps } from '@mui/material/TableCell/TableCell'
import { ButtonPropsColorOverrides } from '@mui/material/Button'
import { IListAction, ListActionHandler } from 'common/types/list'
import { IObjectWithId } from 'common/types'

export interface ITableAction extends IListAction {
  color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
}

export interface ITableRow extends IObjectWithId {
  id: string | number
  selected?: boolean
}

export interface IGrubTableProps<TData extends ITableRow, TColumn extends IGrubTableColumn<TData> = IGrubTableColumn<TData>> {
  className?: string
  actions?: ITableAction[]
  columns: TColumn[]
  data: TData[]
  onAction?: ListActionHandler<TData, ITableAction>
  page: number
  pages: number
  onPageChange(event: ChangeEvent<unknown>, page: number): void
}

export interface IGrubTableColumn<TData extends IObjectWithId> extends Pick<TableCellProps, 'align' | 'height'> {
  id: string
  field: string
  headerName: string
  renderCell?(row: TData): React.ReactElement
  hidden?: boolean
}

export type IGrubTable = <TData extends ITableRow, TColumn extends IGrubTableColumn<TData>, Context = unknown>(
  props: PropsWithChildren<IGrubTableProps<TData, TColumn>>,
  context?: Context
) => React.ReactElement | null
