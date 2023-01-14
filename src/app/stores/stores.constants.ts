import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { UserPermissions } from 'common/auth/auth.constants'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { GSMode } from 'common/utils/mode/mode.types'

export const storeServiceToken = 'StoreService'
export const storeModule = 'StoreModule'

export const storeRoutePath = '/stores'

export const defaultStoreState = {
  isLoading: false,
  selected: null,
  mode: GSMode.New,
}

export enum StoreAction {
  New = 'New Store',
  Edit = 'Edit Store',
  Delete = 'Delete Store',
  View = 'View Store',
}

export const StoreSpeedActions:ISpeedDialerAction[] = [
  {
    label: StoreAction.New,
    icon: AddIcon,
  }
]

export const StoreActionsViewMode = [
  {
    label: StoreAction.View,
    icon: VisibilityIcon,
  },
]

export const StoreActionsEditMode = [
  {
    label: StoreAction.Edit,
    icon: EditIcon,
  },
  {
    label: StoreAction.Delete,
    icon: DeleteIcon,
  }
]

export enum ValidationStoreMessage {
  CreateSuccess = 'Your store has been created.',
  DeleteSuccess = 'Your store has been deleted.',
  UpdateSuccess = 'Your store has been updated.',
  confirmDelete = 'You are about to delete this store. This cannot be undone. Do you wish to continue?'
}

export const storeIconList = [
  {
    title: 'Truck',
    url: 'assets/icons/food-truck.png'
  },
  {
    title: 'Storefront',
    url: 'assets/icons/store-front.png'
  },
  {
    title: 'Truck',
    url: 'assets/icons/food-truck.png'
  },
  {
    title: 'Storefront',
    url: 'assets/icons/store-front.png'
  }
]

export enum ValidationStoreMenuMessage {
  AddMenuSuccess = 'The menu has been added to your store.',
  DeleteMenuSuccess = 'The menu has been deleted from your store.',
  DeleteStoreMenu = 'You are about to remove this menu from your store. Do you wish to continue?'
}

export const storePermissions = [
  UserPermissions.ViewStores,
  UserPermissions.MaintainStores
]
