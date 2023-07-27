import React, { ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { Loading } from 'core/components/loading/loading'
import { usePagination } from 'common/hooks/pagination.hook'
import { IListAction } from 'common/list.types'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { FilePicker } from 'core/components/file-picker/file-picker'
import { QuickPicker } from 'core/components/quick-picker/quick-picker'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { useCoreModule } from 'core/core-module-hook'
import { IconCardList } from 'core/components/icon-card-list/icon-card-list'
import { useProductModule } from 'app/products/products-module-hook'
import { IMenu } from 'app/products/menus/menus.types'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { useStoreModule } from './stores-module-hook'
import { IStore, IStoreState, IStoreCardItem } from './stores.types'
import { StoreForm } from './store-form/store-form'
import { 
  StoreSpeedActions, 
  StoreAction, 
  defaultStoreState,
  StoreActionsEditMode, 
  StoreActionsViewMode,
  ValidationStoreMenuMessage
} from './stores.constants'
import { IStoreFormValues } from './store-form/store-form.types'
import { defaultStoreFormData } from './store-form/store-form.constants'
import { normalizeData } from './stores.utils'
import styles from './stores.module.scss'

export const Stores = (): JSX.Element => {
  const { ErrorHandler } = useCoreModule()
  const { StoreService } = useStoreModule()
  const { MenuService } = useProductModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const [ pickerIsDirty, setPickerIsDirty] = useState<boolean>(false)
  const [state, setState] = useState<IStoreState>(defaultStoreState)
  
  const canEditStores = hasPermission(UserPermissions.MaintainStores)
  const validationMessages = generateValidationMessages(ObjectType.Store)

  const {
    open: quickPickerOpen,
    openDialog: openQuickPickerDialog,
    closeDialog: closeQuickPickerDialog,
  } = useDialog<IQuickPickerItem[]>([])

  const {
    data: storeDialogData,
    open: storeDialogOpen,
    setData: setStoreData,
    openDialog: openStoreDialog,
    closeDialog: closeStoreDialog,
  } = useDialog<IStore|null>()

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<string | null>(null)

  const {
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog
  } = useDialog<null>(null)

  const {
    refresh,
    state: paginationState,
    pagination: pagination,
  } = usePagination<IStore>(StoreService.getAll)

  const {
    state: menuPaginationState,
    pagination: menuPagination
  } = usePagination<IMenu>(MenuService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, 12)

  const handleCardAction = useCallback((item: IStoreCardItem, action: IListAction): void => {
    switch (action.label) {
      case StoreAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case StoreAction.View:
        setPickerIsDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openStoreDialog(item)
        break
      case StoreAction.Edit:
        setPickerIsDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditStores ? GSMode.Edit : GSMode.View }))
        openStoreDialog(item)
        break
      default:
        break
    }
  }, [openStoreDialog, openDeleteDialog, canEditStores])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case StoreAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openStoreDialog(defaultStoreFormData)
        break
      default:
        break
    }
  }, [openStoreDialog])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await StoreService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    await refresh()
  }, [refresh, closeDeleteDialog, deleteDialogData, StoreService, ErrorHandler, validationMessages.deleteSuccess])

  const handleSubmit = useCallback(async (data: IStoreFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeStoreDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await StoreService.create(data)
          toast.success(validationMessages.createSuccess)
          break
        case GSMode.Edit:
          await StoreService.update(data)
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
  }, [closeStoreDialog, refresh, state.mode, StoreService, ErrorHandler, validationMessages.createSuccess, validationMessages.updateSuccess])

  const onAddMenu = useCallback(async (menuData: IMenu): Promise<void> => {
    try {
      await StoreService.addMenu(storeDialogData?.id ?? '', menuData.id ?? '')
      toast.success(ValidationStoreMenuMessage.AddMenuSuccess)
      const data = await StoreService.get(storeDialogData?.id ?? '')
      setStoreData(data.data)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
      return
    } 
    setState((prevState) => ({ ...prevState, isLoading: true }))
    void refresh()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [ErrorHandler, StoreService, setStoreData, refresh, storeDialogData?.id])

  const onDeleteMenu = useCallback(async (storeId: string, menuId: string): Promise<void> => {
    try {
      await StoreService.deleteMenu(storeId, menuId)
      toast.success(ValidationStoreMenuMessage.DeleteMenuSuccess)
      const data = await StoreService.get(storeId)
      setStoreData(data.data)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
      return
    }
    setState((prevState) => ({ ...prevState, isLoading: true }))
    void refresh()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [ErrorHandler, StoreService, setStoreData, refresh])

  const handleFilePickerAction = useCallback((file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (storeDialogData) {
          setStoreData({
            ...storeDialogData,
            thumbnail_url: generateMediaFileUrl(file)
          })
        }
        setPickerIsDirty(true)
        closeFilePickerDialog()
        break
      default:
        break
    }
  }, [setStoreData, storeDialogData, closeFilePickerDialog])

  return (
    <div className={styles.storesContainer}>
      <GrubDialog
        open={storeDialogOpen}
        onClose={closeStoreDialog}
        title={state.mode == GSMode.New ? "Create a new store" : storeDialogData?.name ?? ''}
      >
        <StoreForm 
          mode={state.mode}
          data={storeDialogData}
          onClose={closeStoreDialog}
          onSubmit={handleSubmit}
          onDeleteMenu={onDeleteMenu}
          onOpenAddDialog={openQuickPickerDialog}
          onOpenFilePicker={openFilePickerDialog}
          pickerIsDirty={pickerIsDirty}
        />
      </GrubDialog>
      <QuickPicker 
        open={quickPickerOpen} 
        onClose={closeQuickPickerDialog} 
        data={menuPaginationState.data} 
        currentPage={menuPaginationState.pagination.page} 
        pages={menuPaginationState.pages} 
        onClick={onAddMenu} 
        onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
          void menuPagination.onChangePage(page)
        }}
        title="Add a Menu"
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Store"
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
        <IconCardList 
          data={normalizeData(paginationState.data)} 
          onAction={handleCardAction} 
          actions={canEditStores ? StoreActionsEditMode : StoreActionsViewMode} 
          pages={paginationState.pages} 
          page={paginationState.pagination.page} 
          onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
            void pagination.onChangePage(page)
          }}
        />
      }
      {(paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading) &&
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any stores.</h2>
          <p>You will need to create a store to continue.</p>
          <Button onClick={() => openStoreDialog(defaultStoreFormData)} variant="outlined" color="primary">Create a Store</Button>
        </div>
      }
      {canEditStores && 
        <SpeedDialer actions={StoreSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}