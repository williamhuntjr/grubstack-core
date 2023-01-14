import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Divider from '@mui/material/Divider'
import { IPaginationData, IResponse } from 'common/common.types'
import { useDialog } from 'common/hooks/dialog.hook'
import { UserPermissions } from 'common/auth/auth.constants'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { IMenu } from 'app/products/menus/menus.types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IItem } from 'app/products/items/items.types'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { useCoreModule } from 'core/core-module-hook'
import { IListAction } from 'common/list.types'
import { QuickPicker } from 'core/components/quick-picker/quick-picker'
import { useProductModule } from 'app/products/products-module-hook'
import { BuilderDialog } from 'app/builder/builder-dialog/builder-dialog'
import { CardList } from 'core/components/card-list/card-list'
import { Loading } from 'core/components/loading/loading'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { listPageSize } from 'common/constants'
import { hasPermission } from 'common/auth/auth.utils'
import { BuilderParams, BuilderTypes } from 'app/builder/builder.constants'
import { 
  defaultBuilderState, 
  BuilderMenuActionsViewMode, 
  BuilderMenuActionsEditMode, 
  BuilderAction,
  ValidationBuilderMessage,
  BuilderSpeedActions,
  BuilderItemActionsEditMode,
  BuilderItemActionsViewMode,
  BuilderVarietyActionsEditMode,
  BuilderVarietyActionsViewMode
} from './builder-tool.constants'
import { IngredientForm } from './ingredient-form/ingredient-form'
import { ItemForm } from './item-form/item-form'
import { IBuilderIngredientFormValues } from './ingredient-form/ingredient-form.types'
import { IBuilderToolState, IBuilderDataItem } from './builder-tool.types'
import { buildNutritionLabel } from './builder-tool.utils'
import styles from './builder-tool.module.scss'
import { IBuilderItemFormValues } from './item-form/item-form.types'

export const BuilderTool: FC = () => {
  const [state, setState] = useState<IBuilderToolState>(defaultBuilderState)
  const { objectType, objectId } = useParams()

  const { ItemService, MenuService, VarietyService } = useProductModule()
  const { ErrorHandler } = useCoreModule()

  const canEditItems = hasPermission(UserPermissions.MaintainItems)
  const canEditMenus = hasPermission(UserPermissions.MaintainMenus)
  const canEditVarieties = hasPermission(UserPermissions.MaintainVarieties)

  const canEdit = objectType === BuilderParams.Item ? canEditItems : objectType === BuilderParams.Menu ? canEditMenus : canEditVarieties
  const childType = objectType === BuilderParams.Menu ? BuilderTypes.Item : BuilderTypes.Ingredient
  const childLabel = objectType === BuilderParams.Menu ? BuilderTypes.Item : objectType === BuilderParams.Variety ? BuilderTypes.Ingredient : BuilderTypes.Ingredient

  const generateActions = useCallback((): IListAction[] => {
    if (objectType == BuilderParams.Item) {
      return canEditItems ? BuilderItemActionsEditMode : BuilderItemActionsViewMode 
    }
    if (objectType == BuilderParams.Menu) {
      return canEditMenus ? BuilderMenuActionsEditMode : BuilderMenuActionsViewMode
    }
    if (objectType == BuilderParams.Variety) {
      return canEditVarieties ? BuilderVarietyActionsEditMode : BuilderVarietyActionsViewMode
    }
    return []
  }, [objectType, canEditItems, canEditMenus, canEditVarieties])

  const actions = generateActions()

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<string | null>(null)

  const {
    open: builderDialogOpen,
    openDialog: openBuilderDialog,
    closeDialog: closeBuilderDialog,
  } = useDialog<string>()

  const {
    data: ingredientDialogData,
    open: ingredientDialogOpen,
    openDialog: openIngredientDialog,
    closeDialog: closeIngredientDialog,
  } = useDialog<IIngredient|null>()

  const {
    data: itemDialogData,
    open: itemDialogOpen,
    openDialog: openItemDialog,
    closeDialog: closeItemDialog,
  } = useDialog<IItem|null>()

  const {
    data: quickPickerData,
    open: quickPickerOpen,
    openDialog: openQuickPickerDialog,
    closeDialog: closeQuickPickerDialog,
  } = useDialog<IQuickPickerItem[]>([])

  const fetchData = useCallback(async(): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      let paginatedData:IPaginationData<IItem>|IPaginationData<IMenu>
      let singleData:IResponse<IItem>|IResponse<IMenu>|null = null
      if (objectType === BuilderParams.Item) {
        paginatedData = await ItemService.getIngredients({limit: listPageSize, page: state.page}, objectId ?? '')
        singleData = await ItemService.getItem(objectId ?? '')
      }
      if (objectType === BuilderParams.Menu) {
        paginatedData = await MenuService.getItems({limit: listPageSize, page: state.page}, objectId ?? '')
        singleData = await MenuService.getMenu(objectId ?? '')
      }
      if (objectType === BuilderParams.Variety) {
        paginatedData = await VarietyService.getIngredients({limit: listPageSize, page: state.page}, objectId ?? '')
        singleData = await VarietyService.getVariety(objectId ?? '')
      }
      setState((prevState) => ({ ...prevState, parent: singleData ? singleData.data : null, data: paginatedData.data, total: paginatedData.total, pages: Math.ceil(paginatedData.total / listPageSize )}))
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [state.page, ErrorHandler, ItemService, MenuService, VarietyService, objectType, objectId])

  const closeDialogRefresh = useCallback(async () => {
    try {
      closeBuilderDialog()
      await fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [closeBuilderDialog, fetchData])

  const handleCardAction = useCallback((item: IBuilderDataItem, action: IListAction): void => {
    switch (action.label) {
      case BuilderAction.View:
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        if (objectType === BuilderParams.Item) {
          openIngredientDialog(item as IIngredient)
        }
        if (objectType === BuilderParams.Menu) {
          openItemDialog(item as IItem)
        }
        break
      case BuilderAction.Edit:
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.Edit }))
        if (objectType === BuilderParams.Item) {
          openIngredientDialog(item as IIngredient)
        }
        if (objectType === BuilderParams.Menu) {
          openItemDialog(item as IItem)
        }
        break
      case BuilderAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      default:
        break
    }
  }, [openDeleteDialog, openIngredientDialog, objectType, openItemDialog])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      if (objectType === BuilderParams.Item) {
        await ItemService.deleteIngredient(objectId ?? '', deleteDialogData ?? '')
        toast.success(ValidationBuilderMessage.DeleteItemIngredientSuccess)
      }
      if (objectType === BuilderParams.Variety) {
        await VarietyService.deleteIngredient(objectId ?? '', deleteDialogData ?? '')
        toast.success(ValidationBuilderMessage.DeleteVarietyIngredientSuccess)
      }
      if (objectType === BuilderParams.Menu) {
        await MenuService.deleteItem(objectId ?? '', deleteDialogData ?? '')
        toast.success(ValidationBuilderMessage.DeleteMenuItemSuccess)
      }
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    await fetchData()
  }, [fetchData, closeDeleteDialog, deleteDialogData, MenuService, VarietyService, ErrorHandler, ItemService, objectId, objectType])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case BuilderAction.Add:
        openBuilderDialog(objectId ?? '')
        break
      default:
        break
    }
  }, [openBuilderDialog, objectId])

  const handleClick = useCallback(async (data: IIngredient | IMenu | IItem): Promise<void> => {
    try {
      if (objectType === BuilderParams.Item) {
        await ItemService.addIngredient(objectId ?? '', data.id ?? '')
        toast.success(ValidationBuilderMessage.AddItemIngredientSuccess)
      }
      if (objectType === BuilderParams.Variety) {
        await VarietyService.addIngredient(objectId ?? '', data.id ?? '')
        toast.success(ValidationBuilderMessage.AddVarietyIngredientSuccess)
      }
      if (objectType === BuilderParams.Menu) {
        await MenuService.addItem(objectId ?? '', data.id ?? '')
        toast.success(ValidationBuilderMessage.AddMenuItemSuccess)
      }
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
  }, [ErrorHandler, ItemService, MenuService, VarietyService, objectId, objectType])

  const handleIngredientSubmit = useCallback(async (data: IBuilderIngredientFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeIngredientDialog()
    try {
      await ItemService.updateIngredient(state.parent?.id ?? '', ingredientDialogData?.id ?? '', data)
      toast.success(ValidationBuilderMessage.UpdateItemIngredientSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    await fetchData()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [closeIngredientDialog, fetchData, ErrorHandler, ItemService, ingredientDialogData?.id, state.parent?.id])

  const handleItemSubmit = useCallback(async (data: IBuilderItemFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeItemDialog()
    try {
      await MenuService.updateItem(state.parent?.id ?? '', itemDialogData?.id ?? '', data)
      toast.success(ValidationBuilderMessage.UpdateMenuItemSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    await fetchData()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [fetchData, ErrorHandler, closeItemDialog, MenuService, itemDialogData?.id, state.parent?.id])

  const onPageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setState((prevState) => ({ ...prevState, page: newPage, event: event }))
  }

  const handleAddItemDialog = useCallback(() => {
    openQuickPickerDialog([])
  }, [openQuickPickerDialog])

  useEffect(() => {
    setState((prevState) => ({ ...prevState, objectId: objectId ?? '', objectType: objectType ?? '' }))
  }, [objectId, objectType])

  // eslint-disable-next-line
  useEffect(() => void fetchData(), [objectType, objectId])
  
  useEffect(() => {
    console.log(quickPickerData)
  }, [quickPickerData])

  return (
    <div className={styles.builderToolContainer}>
      <GrubDialog
        open={builderDialogOpen}
        onClose={closeDialogRefresh}
        title={`${childType} Picker`}
      >
        <BuilderDialog builderType={childType} onClose={closeDialogRefresh} onClick={handleClick} />
      </GrubDialog>
      <GrubDialog
        open={ingredientDialogOpen}
        onClose={closeIngredientDialog}
        title={ingredientDialogData?.name ?? ''}
      >
        <IngredientForm onClose={closeIngredientDialog} onSubmit={handleIngredientSubmit} data={ingredientDialogData} mode={state.mode}/>
      </GrubDialog>
      <GrubDialog
        open={itemDialogOpen}
        onClose={closeItemDialog}
        title={itemDialogData?.name ?? ''}
      >
        <ItemForm onClose={closeItemDialog} onSubmit={handleItemSubmit} data={itemDialogData} mode={state.mode} onOpenAddDialog={handleAddItemDialog}/>
      </GrubDialog>
      
      <QuickPicker open={quickPickerOpen} onClose={closeQuickPickerDialog} data={[]} currentPage={1} pages={1} onClick={() => console.log('test')} onPageChange={(event, newPage) => console.log(event, newPage)} />

      <ConfirmationDialog
        open={deleteDialogOpen}
        message={objectType === BuilderParams.Item ? ValidationBuilderMessage.DeleteItemIngredient : objectType === BuilderParams.Menu ? ValidationBuilderMessage.DeleteMenuItem : ValidationBuilderMessage.DeleteVarietyIngredient}
        title={`Delete ${childType}`}
        confirmationButtonLabel="Yes, Proceed"
        cancelButtonLabel="Cancel"
        onConfirm={onDelete}
        onClose={closeDeleteDialog}
      />
      {state.isLoading &&  <Loading />}
      {!state.isLoading &&
      <div className={styles.builderTool}>
        <div className={styles.builderDetailsContainer}>
          {state.parent != null &&
            <div className={styles.builderCard}>
              <img src={state.parent.thumbnail_url} alt="" />
              <h3>{state.parent.name}</h3>
              <p>{state.parent.description}</p>
            </div>
          }
          <div className={styles.builderDetails}>
            {objectType === BuilderParams.Item &&
              buildNutritionLabel(state.data)
            }
          </div>
        </div>
        <div className={styles.builderContent}>
          <div className={styles.builderHeader}>
            <h2>{childLabel} List</h2>
            <Divider />
          </div>
          <div className={styles.builderListContainer}>
            <CardList 
              data={state.data}
              pages={state.pages} 
              page={state.page}
              onPageChange={(event: ChangeEvent<unknown>, page: number) => onPageChange(event, page)}
              layout="vertical"
              buttonColor="secondary"
              cols={5}
              actions={actions} 
              onAction={handleCardAction}
            />
          </div>
        </div>
      </div>
      }
      {canEdit && 
        <SpeedDialer actions={BuilderSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}