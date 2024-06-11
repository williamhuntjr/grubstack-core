import React from 'react'
import { MenuItem } from '@mui/material'
import { ISelectOption } from 'common/components/select-field/select-field.types'

export function defineFormSelectData(options: ISelectOption[]): JSX.Element[] {
  return options.map(({ select_value, select_label }) => {
    const label = `${select_label}`
    return (
      <MenuItem value={select_value} key={select_value} title={label}>
        {label}
      </MenuItem>
    )
  })
}