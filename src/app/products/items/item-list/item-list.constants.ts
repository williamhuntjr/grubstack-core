import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HardwareIcon from '@mui/icons-material/Hardware'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'

export enum ItemAction {
  New = 'New Item',
  Build = 'Build',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export const ItemActionsViewMode = [
  {
    label: ItemAction.View,
    icon: VisibilityIcon,
  },
]

export const ItemActionsEditMode = [
  {
    label: ItemAction.Build,
    icon: HardwareIcon,
  },
  {
    label: ItemAction.Edit,
    icon: EditIcon,
  },
  {
    label: ItemAction.Delete,
    icon: DeleteIcon,
  },
]

export const ItemSpeedActions: ISpeedDialerAction[] = [
  {
    label: ItemAction.New,
    icon: AddIcon,
  },
]
