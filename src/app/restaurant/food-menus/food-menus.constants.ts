import DeleteIcon from '@mui/icons-material/Delete'
import HardwareIcon from '@mui/icons-material/Hardware'
import AddIcon from '@mui/icons-material/Add'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'

export enum ValidationLocationMenuMessage {
  AddMenuSuccess = 'The menu has been added to your location.',
  DeleteMenuSuccess = 'The menu has been deleted from your location.',
  DeleteStoreMenu = 'You are about to remove this menu from your location. Do you wish to continue?',
}

export enum FoodMenuAction {
  Add = 'Add',
  Build = 'Build',
  Delete = 'Delete',
}

export const FoodMenuActionsEditMode = [
  {
    label: FoodMenuAction.Build,
    icon: HardwareIcon,
  },
  {
    label: FoodMenuAction.Delete,
    icon: DeleteIcon,
  },
]

export const FoodMenuSpeedActions: ISpeedDialerAction[] = [
  {
    label: FoodMenuAction.Add,
    icon: AddIcon,
  },
]
