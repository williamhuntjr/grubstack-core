import React, { FC, ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { usePagination } from 'common/hooks/pagination.hook'
import { ObjectType } from 'common/objects'
import { builderRoutePath } from 'app/builder/builder.constants'
import { generateValidationMessages } from 'common/validation/validation'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { ConfirmationDialog } from 'common/components/confirmation-dialog/confirmation-dialog'
import { SpeedDialer } from 'common/components/speed-dialer/speed-dialer'
import { CardList } from 'common/components/card-list/card-list'
import { IListAction } from 'common/types/list'
import { FilePicker } from 'common/components/file-picker/file-picker'
import { Loading } from 'common/components/loading/loading'
import { filePickerSize } from 'common/constants'
import { useCoreModule } from 'core/core-module-hook'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
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

  const [ state, setState ] = useState<IMenuState>(defaultMenuState)
  const { MediaLibraryService } = useMediaLibraryModule()
  const [ isPickerDirty, setIsPickerDirty ] = useState<boolean>(false)

  const canEditMenus = hasPermission(UserPermissions.MaintainMenus)
  const validationMessages = generateValidationMessages(ObjectType.Menu)

  let navigate = useNavigate()
  
  const {
    setData: setMenuData,
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
  } = useDialog<string|null>(null)

  const {
    data: filePickerData,
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog
  } = useDialog<IMenu|null>(null)

  const {
    refresh,
    state: paginationState,
    pagination: pagination
  } = usePagination<IMenu>(MenuService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, filePickerSize)

  const handleCardAction = (item: IMenu, action: IListAction): void => {
    switch (action.label) {
      case MenuAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case MenuAction.View:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openMenuDialog(item)
        break
      case MenuAction.Edit:
        setIsPickerDirty(false)
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
  }

  const handleSpeedAction = (action: string): void => {
    switch (action) {
      case MenuAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openMenuDialog(defaultMenuFormData)
        break
      default:
        break
    }
  }

  const onDelete = async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await MenuService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
    }
  }

  const handleSubmit = async (data: IMenuFormValues): Promise<void> => {
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
  }

  const handleFilePickerAction = (file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerData) {
          setMenuData({
            ...filePickerData,
            thumbnail_url: file.url
          })
        }
        setIsPickerDirty(true)
        closeFilePickerDialog()
        break
      default:
        break
    }
  }

  return (
    <div className={styles.menuList}>
      <GrubDialog
        open={menuDialogOpen}
        onClose={closeMenuDialog}
        title={state.mode == GSMode.New ? "Create a new menu" : menuDialogData?.name ?? ''}
      >
        <MenuForm 
          mode={state.mode} 
          data={menuDialogData} 
          onSubmit={handleSubmit}
          isPickerDirty={isPickerDirty}
          onOpenFilePicker={openFilePickerDialog}
        />
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
      <FilePicker
        open={filePickerDialogOpen}
        onClose={closeFilePickerDialog}
        paginationState={filePickerPaginationState}
        pagination={filePickerPagination}
        onAction={handleFilePickerAction}
      />
      {(paginationState.isLoading || state.isLoading) &&  <Loading />}
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
          {canEditMenus &&
            <Button onClick={() => openMenuDialog(defaultMenuFormData)} variant="outlined" color="primary">Create a Menu</Button>
          }
        </div>
      }
      {canEditMenus && 
        <SpeedDialer actions={MenuSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}