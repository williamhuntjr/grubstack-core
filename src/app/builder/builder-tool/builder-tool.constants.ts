import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GSMode } from 'common/utils/mode/mode.types'
import { ISpeedDialerAction } from 'common/components/speed-dialer/speed-dialer.types'
import { IListAction } from 'common/types/list'
import { BuilderTypes } from '../builder.constants'

export const defaultBuilderState = {
  childType: BuilderTypes.Ingredient,
  data: [],
  isLoading: true,
  page: 1,
  pages: 1,
  selected: null,
  optional: null,
  parent: null,
  mode: GSMode.New
}

export enum BuilderAction {
  Add = 'Add',
  Delete = 'Delete',
  Edit = 'Edit',
  View = 'View'
}

export const BuilderItemActionsViewMode = [
  {
    label: BuilderAction.View,
    icon: VisibilityIcon
  },
]
export const BuilderMenuActionsViewMode = [
  {
    label: BuilderAction.View,
    icon: VisibilityIcon
  },
]
export const BuilderVarietyActionsViewMode = []

export const BuilderItemActionsEditMode = [
  {
    label: BuilderAction.Edit,
    icon: EditIcon
  },
  {
    label: BuilderAction.Delete,
    icon: DeleteIcon
  },
]

export const BuilderMenuActionsEditMode = [
  {
    label: BuilderAction.Edit,
    icon: EditIcon
  },
  {
    label: BuilderAction.Delete,
    icon: DeleteIcon
  },
]

export const BuilderVarietyActionsEditMode = [
  {
    label: BuilderAction.Delete,
    icon: DeleteIcon
  },
]

export const BuilderSpeedActions:ISpeedDialerAction[] = [
  {
    label: BuilderAction.Add,
    icon: AddIcon,
  }
]

export enum ValidationBuilderMessage {
  DeleteItemIngredient = 'You are about to remove this ingredient from your item. Do you wish to continue?',
  DeleteMenuItem = 'You are about to remove this item from your menu. Do you wish to continue?',
  DeleteVarietyIngredient = 'You are about to remove this ingredient from your variety. Do you wish to continue?',

  AddItemIngredientSuccess = 'The ingredient has been added to your item.',
  AddMenuItemSuccess = 'The item has been added to your menu.',

  DeleteItemIngredientSuccess = 'The ingredient has been removed from the item.',
  DeleteMenuItemSuccess = 'The item has been removed from the menu.',

  UpdateItemIngredientSuccess = 'The ingredient has been updated on the item.',
  UpdateMenuItemSuccess = 'The item has been updated on the menu.',
  
  AddVarietyIngredientSuccess = 'The ingredient has been added to your variety.',
  DeleteVarietyIngredientSuccess = 'The ingredient has been removed from the variety.',

  AddItemVarietySuccess = 'The variety has been added to your item.',
  DeleteItemVarietySuccess = 'The variety has been removed from the item.',
}

export enum BuilderVarietyListAction {
  Add = 'Add',
  Delete = 'Delete'
}

export const BuilderVarietyListActions:IListAction[] = [
  {
    label: BuilderVarietyListAction.Delete,
    icon: DeleteIcon,
  }
]