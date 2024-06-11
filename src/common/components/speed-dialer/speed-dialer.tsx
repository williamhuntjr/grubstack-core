import React, { FC, memo } from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { ISpeedDialer } from './speed-dialer.types'
import styles from './speed-dialer.module.scss'

export const SpeedDialer: FC<ISpeedDialer> = memo(({ actions, onAction }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDialer"
      icon={<SpeedDialIcon />}
      direction="up"
      className={styles.speedDialerContainer}
    >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.label}
            icon={<action.icon />}
            tooltipTitle={action.label}
            onClick={() => onAction(action.label)}
          ></SpeedDialAction>
        ))}
    </SpeedDial>
  )
})