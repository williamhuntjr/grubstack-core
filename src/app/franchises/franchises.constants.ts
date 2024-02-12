import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { UserPermissions } from 'auth/auth.constants'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { GSMode } from 'common/utils/mode/mode.types'

export const franchiseServiceToken = 'FranchiseService'
export const franchiseModule = 'FranchiseModule'

export const franchiseRoutePath = '/franchises'

export const defaultFranchiseState = {
  isLoading: false,
  selected: null,
  mode: GSMode.New,
}

export enum FranchiseAction {
  New = 'New Franchise',
  Edit = 'Edit Franchise',
  Delete = 'Delete Franchise',
  View = 'View Franchise',
}

export const FranchiseSpeedActions:ISpeedDialerAction[] = [
  {
    label: FranchiseAction.New,
    icon: AddIcon,
  }
]

export const FranchiseActionsViewMode = [
  {
    label: FranchiseAction.View,
    icon: VisibilityIcon,
  },
]

export const FranchiseActionsEditMode = [
  {
    label: FranchiseAction.Edit,
    icon: EditIcon,
  },
  {
    label: FranchiseAction.Delete,
    icon: DeleteIcon,
  }
]

export enum ValidationFranchiseMessage {
  CreateSuccess = 'Your franchise has been created.',
  DeleteSuccess = 'Your franchise has been deleted.',
  UpdateSuccess = 'Your franchise has been updated.',
  confirmDelete = 'You are about to delete this franchise. This cannot be undone. Do you wish to continue?'
}

export enum ValidationFranchiseStoreMessage {
  AddStoreSuccess = 'The store has been added to your franchise.',
  DeleteStoreSuccess = 'The store has been deleted from your franchise.',
  DeleteFranchiseStore = 'You are about to remove this store from your franchise. Do you wish to continue?'
}

export const franchisePermissions = [
  UserPermissions.ViewFranchises,
  UserPermissions.MaintainFranchises
]
