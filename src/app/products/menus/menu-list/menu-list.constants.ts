import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import HardwareIcon from '@mui/icons-material/Hardware'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { GSMode } from 'common/utils/mode/mode.types'

export const defaultMenuState = {
  isLoading: false,
  data: [],
  mode: GSMode.New,
  total: 0,
  pages: 1,
  page: 1,
}

export enum MenuAction {
  New = 'New Menu',
  Build = 'Build',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export const MenuSpeedActions:ISpeedDialerAction[] = [
  {
    label: MenuAction.New,
    icon: AddIcon,
  }
]

export const MenuActionsViewMode = [
  {
    label: MenuAction.View,
    icon: VisibilityIcon,
  },
]

export const MenuActionsEditMode = [
  {
    label: MenuAction.Build,
    icon: HardwareIcon,
  },
  {
    label: MenuAction.Edit,
    icon: EditIcon,
  },
  {
    label: MenuAction.Delete,
    icon: DeleteIcon,
  }
]

export enum ValidationMenuMessage {
  CreateSuccess = 'Your menu has been created.',
  DeleteSuccess = 'Your menu has been deleted.',
  UpdateSuccess = 'Your menu has been updated.',
  ConfirmDelete = 'You are about to delete this menu. This cannot be undone. Do you wish to continue?'
}