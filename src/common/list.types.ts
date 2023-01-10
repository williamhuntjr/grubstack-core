import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

export interface IListAction {
  label: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
}

export type ListActionHandler<TData, Action> = (item: TData, action: Action) => void
export type onClickListHandler<TData> = (item: TData) => void
