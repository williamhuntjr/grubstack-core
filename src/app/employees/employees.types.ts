import { GSMode } from 'common/utils/mode/mode.types'

export interface IEmployeeService {
  getAll(): Promise<void>
}

export interface IEmployeeState {
  isLoading: boolean
  mode: GSMode
}

export interface IEmployee {
  name: string
}