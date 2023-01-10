import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { usePagination } from 'common/hooks/pagination.hook'
import { ObjectType } from 'common/objects'
import { builderRoutePath } from 'app/builder/builder.constants'
import { generateValidationMessages } from 'common/validation/validation'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { CardList } from 'core/components/card-list/card-list'
import { IListAction } from 'common/list.types'
import { Loading } from 'core/components/loading/loading'
import { useCoreModule } from 'core/core-module-hook'
import { useProductModule } from 'app/products/products-module-hook'
import { IMenu, IMenuState } from 'app/products/menus/menus.types'
import { menuRoutePath } from 'app/products/menus/menus.constants'
import { 
  MenuSpeedActions,
  defaultMenuState, 
  MenuActionsEditMode, 
  MenuActionsViewMode, 
  MenuAction,
} from './menu-list.constants'
import { MenuForm } from '../menu-form/menu-form'
import { defaultMenuFormData } from '../menu-form/menu-form.constants'
import { IMenuFormValues } from '../menu-form/menu-form.types'
import styles from './menu-list.module.scss'

export const MenuList: FC = () => {
  const { ErrorHandler } = useCoreModule()
  const { MenuService } = useProductModule()

  const [state, setState] = useState<IMenuState>(defaultMenuState)

  const canEditMenus = true
  const validationMessages = generateValidationMessages(ObjectType.Menu)

  let navigate = useNavigate()
  
  const {
    data: menuDialogData,
    open: menuDialogOpen,
    openDialog: openMenuDialog,
    closeDialog: closeMenuDialog,
  } = useDialog<IMenu|null>()

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<string | null>(null)

  const {
    refresh,
    state: paginationState,
    pagination: pagination
  } = usePagination<IMenu>(MenuService.getAll)

  const handleCardAction = useCallback((item: IMenu, action: IListAction): void => {
    switch (action.label) {
      case MenuAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case MenuAction.View:
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openMenuDialog(item)
        break
      case MenuAction.Edit:
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditMenus ? GSMode.Edit : GSMode.View }))
        openMenuDialog(item)
        break
      case MenuAction.Build:
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditMenus ? GSMode.Edit : GSMode.View }))
        navigate(`${builderRoutePath}${menuRoutePath}/${item.id}`)
        break
      default:
        break
    }
  }, [canEditMenus, openDeleteDialog, openMenuDialog, navigate])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case MenuAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openMenuDialog(defaultMenuFormData)
        break
      default:
        break
    }
  }, [openMenuDialog])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await MenuService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
    }
  }, [refresh, closeDeleteDialog, deleteDialogData, MenuService, ErrorHandler, validationMessages.deleteSuccess])

  const handleSubmit = useCallback(async (data: IMenuFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeMenuDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await MenuService.create(data)
          toast.success(validationMessages.createSuccess)
          break
        case GSMode.Edit:
          await MenuService.update(data)
          toast.success(validationMessages.updateSuccess)
          break
        default:
          break
      }
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }, [closeMenuDialog, refresh, state.mode, MenuService, ErrorHandler, validationMessages.createSuccess, validationMessages.updateSuccess])

  return (
    <div className={styles.menuList}>
      <GrubDialog
        open={menuDialogOpen}
        onClose={closeMenuDialog}
        title={state.mode == GSMode.New ? "Create a new menu" : menuDialogData?.name ?? ''}
      >
        <MenuForm mode={state.mode} data={menuDialogData} onClose={closeMenuDialog} onSubmit={handleSubmit}/>
      </GrubDialog>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Menu"
        confirmationButtonLabel="Yes, Proceed"
        cancelButtonLabel="Cancel"
        onConfirm={onDelete}
        onClose={closeDeleteDialog}
      />
      {paginationState.isLoading || state.isLoading &&  <Loading />}
      {paginationState.data.length > 0 && !paginationState.isLoading && !state.isLoading &&
        <CardList 
          data={paginationState.data} 
          onAction={handleCardAction} 
          actions={canEditMenus ? MenuActionsEditMode : MenuActionsViewMode} 
          pages={paginationState.pages} 
          page={paginationState.pagination.page}
          onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
            void pagination.onChangePage(page)
          }}
          layout="vertical"
          cols={5}
          buttonColor="secondary"
        />
      }
      {paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading &&
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any menus.</h2>
          <p>You will need to create a menu to continue.</p>
          <Button onClick={() => openMenuDialog(defaultMenuFormData)} variant="outlined" color="primary">Create a Menu</Button>
        </div>
      }
      {canEditMenus && 
        <SpeedDialer actions={MenuSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}