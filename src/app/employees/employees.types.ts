import { GSMode } from 'common/utils/mode/mode.types'
import { IPaginationData, IPaginationParams } from 'common/types'

export interface IEmployeeService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IEmployee>>
  delete(employeeId: number): Promise<void>
  create(params: IEmployee): Promise<IEmployee>
  update(params: IEmployee): Promise<IEmployee>
}

export interface IEmployeeState {
  isLoading: boolean
  mode: GSMode
}

export interface IEmployee {
  id?: number
  first_name: string
  last_name: string
  gender: string
  address1: string
  city: string
  state: string 
  postal: string 
  phone: string
  email: string
  profile_thumbnail_url: string
  hire_date: string
  employment_status: string
  job_title: string
}

export interface IEmployeeTableRow {
  id: number
  name: string
  gender: string
  phone: string
  email: string
  hire_date: string
  employment_status: string
  profile_thumbnail_url: string
  job_title: string
}