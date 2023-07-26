import AddIcon from '@mui/icons-material/Add'
import { UserPermissions } from 'common/auth/auth.constants'
import { GSMode } from 'common/utils/mode/mode.types'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'

export const employeeServiceToken = 'EmployeeService'
export const employeeModule = 'EmployeeModule'

export const employeeRoutePath = '/employees'

export const employeePermissions = [
  UserPermissions.ViewEmployees,
  UserPermissions.MaintainEmployees
]

export const defaultEmployeeState = {
  mode: GSMode.New,
  isLoading: true,
}

export enum EmployeeAction {
  New = 'New Employee',
  Edit = 'Edit Employee',
  Delete = 'Delete Employee',
  View = 'View Employee',
}

export const EmployeeSpeedActions:ISpeedDialerAction[] = [
  {
    label: EmployeeAction.New,
    icon: AddIcon,
  },
]