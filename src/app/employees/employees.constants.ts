import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { UserPermissions } from 'auth/auth.constants'
import { GSMode } from 'common/utils/mode/mode.types'
import { IGrubTableColumn, ITableAction } from 'core/components/grub-table/grub-table.types'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { IEmployee } from './employees.types'
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
  id: number
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
    color: "secondary",
  }
]

export const EmployeeTableActionsEditMode:ITableAction[] = [
  {
    label: EmployeeAction.Edit,
    icon: EditIcon,
    color: "secondary",
  },
  {
    label: EmployeeAction.Delete,
    icon: DeleteIcon,
    color: "error",
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

export const employees:IEmployee[] = [
  {
    id: 1,
    first_name: 'William',
    last_name: 'Hunt',
    gender: 'male',
    address1: '123 Test',
    city: 'Suffolk',
    state: 'VA',
    postal: '23434',
    profile_thumbnail_url: '/assets/img/placeholder-male.jpeg',
    email: 'test@test.com',
    hire_date: 'June 1, 2015',
    employment_status: 'active',
    phone: '111-222-3333',
    job_title: 'cook'
  },
  {
    id: 2,
    first_name: 'Erica',
    last_name: 'Hunt',
    gender: 'female',
    address1: '123 Test',
    city: 'Suffolk',
    state: 'VA',
    postal: '23434',
    profile_thumbnail_url: '/assets/img/placeholder-female.jpg',
    email: 'test@test.com',
    hire_date: 'June 1, 2015',
    employment_status: 'active',
    phone: '111-222-3333',
    job_title: 'server'
  }
]