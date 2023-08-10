import { PropsWithChildren } from 'react'
import { OverridableStringUnion } from '@mui/types'
import { ButtonPropsColorOverrides } from '@mui/material/Button'
import { IListAction, ListActionHandler } from 'common/list.types'
import { IObjectWithId } from 'common/types'
import { TableCellProps } from '@mui/material/TableCell/TableCell'

export interface ITableAction extends IListAction {
  color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides> 
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