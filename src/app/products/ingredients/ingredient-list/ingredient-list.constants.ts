import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'

export enum IngredientAction {
  New = 'New Ingredient',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
}

export const IngredientActionsViewMode = [
  {
    label: IngredientAction.View,
    icon: VisibilityIcon,
  },
]

export const IngredientActionsEditMode = [
  {
    label: IngredientAction.Edit,
    icon: EditIcon,
  },
  {
    label: IngredientAction.Delete,
    icon: DeleteIcon,
  }
]

export const IngredientSpeedActions:ISpeedDialerAction[] = [
  {
    label: IngredientAction.New,
    icon: AddIcon,
  }
]