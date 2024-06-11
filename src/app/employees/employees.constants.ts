import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { UserPermissions } from 'auth/auth.constants'
import { GSMode } from 'common/utils/mode/mode.types'
import { IGrubTableColumn, ITableAction } from 'common/components/grub-table/grub-table.types'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'
import { renderEmployeeIcon, renderEmployeeStatus } from './employees.utils'

export const employeeServiceToken = 'EmployeeService'
export const employeeModule = 'EmployeeModule'

export const employeeRoutePath = '/employees'

export const employeePermissions = [
  UserPermissions.ViewEmployees,
  UserPermissions.MaintainEmployees
]

export const defaultEmployeeState = {
  mode: GSMode.New,
  isLoading: false,
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

export enum EmployeeStatus {
  Employed = 'employed',
  Terminated = 'terminated',
  Suspended = 'suspended'
}

export interface IEmployeeColumn {
  id: string
  name: string
  gender: string
  hire_date: string
  employment_status: string
  email: string
  phone: string
}

export const EmployeeTableActionsViewMode:ITableAction[] = [
  {
    label: EmployeeAction.View,
    icon: VisibilityIcon,
    color: undefined,
  }
]

export const EmployeeTableActionsEditMode:ITableAction[] = [
  {
    label: EmployeeAction.Edit,
    icon: EditIcon,
    color: undefined,
  },
  {
    label: EmployeeAction.Delete,
    icon: DeleteIcon,
    color: undefined,
  }
]

export const employeeColumns: IGrubTableColumn<IEmployeeColumn>[] = [
  {
    id: '1',
    field: 'id',
    headerName: 'ID',
    hidden: true,
  },
  {
    id: '2',
    field: 'name',
    headerName: 'Name',
    renderCell: renderEmployeeIcon
  },
  {
    id: '3',
    field: 'gender',
    headerName: 'Gender',
  },
  {
    id: '4',
    field: 'hire_date',
    headerName: 'Hire Date',
  },
  {
    id: '5',
    field: 'employment_status',
    headerName: 'Status',
    renderCell: renderEmployeeStatus
  },
  {
    id: '6',
    field: 'email',
    headerName: 'Email',
  },
  {
    id: '7',
    field: 'phone',
    headerName: 'Phone',
  },
  {
    id: '8',
    field: 'job_title',
    headerName: 'Job Title',
    hidden: true
  },
  {
    id: '9',
    field: 'profile_thumbnail_url',
    headerName: 'Thumbnail URL',
    hidden: true
  },
]