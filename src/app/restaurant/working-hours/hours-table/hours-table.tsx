import React, { FC, useEffect, useState } from 'react'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import { UserPermissions } from 'auth/auth.constants'
import { hasPermission } from 'auth/auth.utils'
import { getDay } from 'common/utils/date.utils'
import { IHoursTable, IWorkHour } from './hours-table.types'
import { defaultBusinessHours } from './hours-table.constants'
import styles from './hours-table.module.scss'

export const HoursTable: FC<IHoursTable> = ({ onSubmit, data }) => {
  const [state, setState] = useState<IWorkHour[]>(defaultBusinessHours)

  const canEditLocations = hasPermission(UserPermissions.MaintainLocations)

  const setOpen = (day: number, value: boolean): void => {
    const updatedState = [...state]
    updatedState[day].is_open = value
    setState(updatedState)
  }

  const updateTime = (day: number, field: string, hour: number, minute: number): void => {
    const updatedState = [ ...state ]
    if (field == 'open') {
      updatedState[day].open_hour = hour
      updatedState[day].open_minute = minute
    }
    if (field == 'close') {
      updatedState[day].close_hour = hour
      updatedState[day].close_minute = minute
    }
    setState(updatedState)
  }

  const init = (): void => {
    if (data) {
      let hours: IWorkHour[] = []

      data.forEach((hour) => {
        hours[hour.day] = hour
      })
      setState(hours)
    }
  }

  // eslint-disable-next-line
  useEffect(() => init(), [data])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ul className={styles.workingHours}>
        {state.map((hour) => (
          <li key={hour.day}>
            <div className={styles.dayLabel}>{getDay(hour.day)}</div>
            <div className={styles.openSwitch}>
              <Switch
                disabled={!canEditLocations}
                aria-label="Enable Work Hour"
                checked={hour.is_open}
                onChange={(e) => setOpen(hour.day, e.target.checked)}
              />{' '}
              {hour.is_open ? 'Open' : 'Closed'}
            </div>
            <div className={styles.timeFields}>
              <TimeField
                disabled={!canEditLocations}
                value={dayjs()
                  .hour(hour.open_hour ?? 9)
                  .minute(hour.open_minute ?? 0)}
                defaultValue={dayjs()
                  .hour(hour.open_hour ?? 9)
                  .minute(hour.open_minute)}
                className={styles.timeField}
                onChange={(newValue) => {
                  updateTime(hour.day, 'open', newValue?.get('hour') ?? 8, newValue?.get('minute') ?? 0)
                }}
              />
              -
              <TimeField
                disabled={!canEditLocations}
                value={dayjs()
                  .hour(hour.close_hour ?? 17)
                  .minute(hour.close_minute ?? 0)}
                defaultValue={dayjs()
                  .hour(hour.close_hour ?? 17)
                  .minute(hour.close_minute ?? 0)}
                className={styles.timeField}
                onChange={(newValue) => {
                  updateTime(hour.day, 'close', newValue?.get('hour') ?? 17, newValue?.get('minute') ?? 0)
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <Divider />
      <div className={styles.buttonContainer}>
        <Button variant="contained" color="primary" onClick={() => onSubmit(state)} disabled={!canEditLocations}>
          Save
        </Button>
      </div>
    </LocalizationProvider>
  )
}
