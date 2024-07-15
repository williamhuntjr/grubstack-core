import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { UserPermissions } from 'auth/auth.constants'
import { GSMode } from 'common/utils/mode/mode.types'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'

export const locationServiceToken = 'LocationService'
export const locationPermissions = [UserPermissions.ViewLocations, UserPermissions.MaintainLocations]

export const defaultLocationState = {
  isLoading: true,
  mode: GSMode.Edit,
  data: null,
}

export enum LocationAction {
  New = 'New Location',
  Edit = 'Edit Location',
  Delete = 'Delete Location',
  View = 'View Location',
}

export const LocationSpeedActions: ISpeedDialerAction[] = [
  {
    label: LocationAction.Delete,
    icon: DeleteIcon,
  },
  {
    label: LocationAction.New,
    icon: AddIcon,
  },
]
