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
import { listPageSize } from 'common/constants'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'
import { useDialog } from 'common/hooks/dialog.hook'
import { FranchiseFilter, IFranchiseFilters } from 'common/types/filter.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { useCoreModule } from 'core/core-module-hook'
import { IconCardList } from 'core/components/icon-card-list/icon-card-list'
import { useStoreModule } from 'app/stores/stores-module-hook'
import { IStore } from 'app/stores/stores.types'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { normalizeData as storeNormalizeData } from 'app/stores/stores.utils'
import { useFranchiseModule } from './franchises-module-hook'
import { IFranchise, IFranchiseState, IFranchiseCardItem } from './franchises.types'
import { FranchiseForm } from './franchise-form/franchise-form'
import { 
  FranchiseSpeedActions, 
  FranchiseAction, 
  defaultFranchiseState,
  FranchiseActionsEditMode, 
  FranchiseActionsViewMode,
  ValidationFranchiseStoreMessage
} from './franchises.constants'
import { IFranchiseFormValues } from './franchise-form/franchise-form.types'
import { defaultFranchiseFormData } from './franchise-form/franchise-form.constants'
import { normalizeData } from './franchises.utils'
import styles from './franchises.module.scss'

export const Franchises = (): JSX.Element => {
  const { ErrorHandler } = useCoreModule()
  const { FranchiseService } = useFranchiseModule()
  const { StoreService } = useStoreModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const [ isPickerDirty, setIsPickerDirty ] = useState<boolean>(false)
  const [ state, setState ] = useState<IFranchiseState>(defaultFranchiseState)
  
  const canEditFranchises = hasPermission(UserPermissions.MaintainFranchises)
  const validationMessages = generateValidationMessages(ObjectType.Franchise)

  const {
    open: quickPickerOpen,
    openDialog: openQuickPickerDialog,
    closeDialog: closeQuickPickerDialog,
  } = useDialog<IQuickPickerItem[]>([])

  const {
    data: franchiseDialogData,
    open: franchiseDialogOpen,
    setData: setFranchiseData,
    openDialog: openFranchiseDialog,
    closeDialog: closeFranchiseDialog,
  } = useDialog<IFranchise|null>()

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<string | null>(null)

  const {
    data: filePickerData,
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog
  } = useDialog<IFranchise|null>(null)

  const {
    refresh,
    state: paginationState,
    pagination: pagination,
  } = usePagination<IFranchise, IFranchiseFilters>(FranchiseService.getAll, listPageSize, { [FranchiseFilter.ShowStores]: true })

  const {
    state: storePaginationState,
    pagination: storePagination
  } = usePagination<IStore>(StoreService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, 12)

  const handleCardAction = useCallback((item: IFranchiseCardItem, action: IListAction): void => {
    switch (action.label) {
      case FranchiseAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case FranchiseAction.View:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openFranchiseDialog(item)
        break
      case FranchiseAction.Edit:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditFranchises ? GSMode.Edit : GSMode.View }))
        openFranchiseDialog(item)
        break
      default:
        break
    }
  }, [openFranchiseDialog, openDeleteDialog, canEditFranchises])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case FranchiseAction.New:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openFranchiseDialog(defaultFranchiseFormData)
        break
      default:
        break
    }
  }, [openFranchiseDialog])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await FranchiseService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    await refresh()
  }, [refresh, closeDeleteDialog, deleteDialogData, FranchiseService, ErrorHandler, validationMessages.deleteSuccess])

  const handleSubmit = useCallback(async (data: IFranchiseFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeFranchiseDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await FranchiseService.create(data)
          toast.success(validationMessages.createSuccess)
          break
        case GSMode.Edit:
          await FranchiseService.update(data)
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
  }, [closeFranchiseDialog, refresh, state.mode, FranchiseService, ErrorHandler, validationMessages.createSuccess, validationMessages.updateSuccess])

  const onAddStore = useCallback(async (storeData: IFranchiseCardItem): Promise<void> => {
    try {
      await FranchiseService.addStore(franchiseDialogData?.id ?? '', storeData.id ?? '')
      toast.success(ValidationFranchiseStoreMessage.AddStoreSuccess)
      const data = await FranchiseService.get(franchiseDialogData?.id ?? '')
      setFranchiseData(data.data)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
      return
    } 
    setState((prevState) => ({ ...prevState, isLoading: true }))
    void refresh()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [ErrorHandler, FranchiseService, setFranchiseData, refresh, franchiseDialogData?.id])

  const onDeleteStore = useCallback(async (franchiseId: string, storeId: string): Promise<void> => {
    try {
      await FranchiseService.deleteStore(franchiseId, storeId)
      toast.success(ValidationFranchiseStoreMessage.DeleteStoreSuccess)
      const data = await FranchiseService.get(franchiseId)
      setFranchiseData(data.data)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
      return
    }
    setState((prevState) => ({ ...prevState, isLoading: true }))
    void refresh()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [ErrorHandler, FranchiseService, setFranchiseData, refresh])

  const handleFilePickerAction = useCallback((file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerData) {
          setFranchiseData({
            ...filePickerData,
            thumbnail_url: generateMediaFileUrl(file)
          })
        }
        setIsPickerDirty(true)
        closeFilePickerDialog()
        break
      default:
        break
    }
  }, [setFranchiseData, filePickerData, closeFilePickerDialog])

  return (
    <div className={styles.franchisesContainer}>
      <GrubDialog
        open={franchiseDialogOpen}
        onClose={closeFranchiseDialog}
        title={state.mode == GSMode.New ? "Create a new franchise" : franchiseDialogData?.name ?? ''}
      >
        <FranchiseForm 
          mode={state.mode}
          data={franchiseDialogData}
          onClose={closeFranchiseDialog}
          onSubmit={handleSubmit}
          onDeleteStore={onDeleteStore}
          onOpenAddDialog={openQuickPickerDialog}
          onOpenFilePicker={openFilePickerDialog}
          isPickerDirty={isPickerDirty}
        />
      </GrubDialog>
      <QuickPicker 
        open={quickPickerOpen} 
        onClose={closeQuickPickerDialog} 
        data={storeNormalizeData(storePaginationState.data)}
        currentPage={storePaginationState.pagination.page} 
        pages={storePaginationState.pages} 
        onClick={onAddStore} 
        onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
          void storePagination.onChangePage(page)
        }}
        title="Add a Store"
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Franchise"
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
          actions={canEditFranchises ? FranchiseActionsEditMode : FranchiseActionsViewMode} 
          pages={paginationState.pages} 
          page={paginationState.pagination.page} 
          onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
            void pagination.onChangePage(page)
          }}
        />
      }
      {(paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading) &&
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any franchises.</h2>
          <p>You will need to create a franchise to continue.</p>
          {canEditFranchises && 
            <Button onClick={() => openFranchiseDialog(defaultFranchiseFormData)} variant="outlined" color="primary">Create a Franchise</Button>
          }
        </div>
      }
      {canEditFranchises && 
        <SpeedDialer actions={FranchiseSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}