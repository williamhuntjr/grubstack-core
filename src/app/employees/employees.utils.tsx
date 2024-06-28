import React from 'react'
import { capitalize, cls } from 'common/utils/utils'
import { IGrubListItem } from 'common/components/grub-list/grub-list.types'
import { EmployeeStatus } from './employees.constants'
import { IEmployee, IEmployeeTableRow } from './employees.types'
import styles from './employees.module.scss'

export function normalizeData(data: IEmployee[]): IEmployeeTableRow[] {
  return data.map((employee) => ({
    id: employee.id ?? '',
    name: `${employee.first_name} ${employee.last_name}`,
    gender: capitalize(employee.gender.replace('_', ' ')),
    phone: employee.phone,
    email: employee.email,
    employment_status: employee.employment_status,
    hire_date: employee.hire_date,
    profile_thumbnail_url: employee.profile_thumbnail_url,
    job_title: capitalize(employee.job_title),
  }))
}

export function renderEmployeeIcon(row: IEmployeeTableRow): JSX.Element {
  return (
    <div className={styles.nameContainer}>
      <img src={row.profile_thumbnail_url} alt={row.name} />
      <div>
        <h6>{row.name}</h6>
        <span>{row.job_title}</span>
      </div>
    </div>
  )
}

export function renderEmployeeStatus(row: IEmployeeTableRow): JSX.Element {
  let statusClass
  switch (row.employment_status) {
    case EmployeeStatus.Employed:
      statusClass = styles.active
      break
    case EmployeeStatus.Suspended:
      statusClass = styles.suspended
      break
    case EmployeeStatus.Terminated:
      statusClass = styles.terminated
      break
    default:
      statusClass = styles.active
  }
  return <span className={cls(styles.employedStatus, statusClass)}>{capitalize(row.employment_status)}</span>
}

export function normalizeListData(data: IEmployee[]): IGrubListItem[] {
  return data.map((item) => ({
    value: item.id ?? '',
    label: `${item.first_name} ${item.last_name}`,
  }))
}
