export interface IHoursTable {
  data: IWorkHour[]
  onSubmit: (hours: IWorkHour[]) => void
}

export interface IWorkHour {
  day: number
  open_hour: number
  open_minute: number
  close_hour: number
  close_minute: number
  is_open: boolean
  working_hour_type_id: number
}