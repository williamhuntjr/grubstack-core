import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import HardwareIcon from '@mui/icons-material/Hardware'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'

export enum VarietyAction {
  New = 'New Variety',
  Build = 'Build',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export const VarietyActionsViewMode = [
  {
    label: VarietyAction.View,
    icon: VisibilityIcon,
  },
]

export const VarietyActionsEditMode = [
  {
    label: VarietyAction.Build,
    icon: HardwareIcon
  },
  {
    label: VarietyAction.Edit,
    icon: EditIcon
  },
  {
    label: VarietyAction.Delete,
    icon: DeleteIcon,
  }
]

export const VarietySpeedActions:ISpeedDialerAction[] = [
  {
    label: VarietyAction.New,
    icon: AddIcon,
  }
]