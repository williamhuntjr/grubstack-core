import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'

export interface ISpeedDialerAction {
  label: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
export interface ISpeedDialer {
  actions: ISpeedDialerAction[]
  onAction(value: string): void
}
