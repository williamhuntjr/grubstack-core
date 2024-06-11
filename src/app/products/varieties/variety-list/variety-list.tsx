import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { usePagination } from 'common/hooks/pagination.hook'
import { useCoreModule } from 'core/core-module-hook'
import { Loading } from 'common/components/loading/loading'
import { builderRoutePath } from 'app/builder/builder.constants'
import { useProductModule } from 'app/products/products-module-hook'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { ConfirmationDialog } from 'common/components/confirmation-dialog/confirmation-dialog'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { SpeedDialer } from 'common/components/speed-dialer/speed-dialer'
import { CardList } from 'common/components/card-list/card-list'
import { IListAction } from 'common/types/list'
import { FilePicker } from 'common/components/file-picker/file-picker'
import { IVariety, IVarietyState } from 'app/products/varieties/varieties.types'
import { defaultVarietyState, varietyRoutePath } from 'app/products/varieties/varieties.constants'
import { defaultVarietyFormData } from 'app/products/varieties/variety-form/variety-form.constants'
import { IVarietyFormValues } from 'app/products/varieties/variety-form/variety-form.types'
import { VarietyForm } from 'app/products/varieties/variety-form/variety-form'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { VarietyActionsEditMode, VarietyActionsViewMode, VarietySpeedActions, VarietyAction } from './variety-list.constants'
import styles from './variety-list.module.scss'

export const VarietyList: FC = () => {
  const { ErrorHandler } = useCoreModule()
  const { VarietyService } = useProductModule()

  const [ state, setState ] = useState<IVarietyState>(defaultVarietyState)
  const { MediaLibraryService } = useMediaLibraryModule()
  const [ isPickerDirty, setIsPickerDirty ] = useState<boolean>(false)

  let navigate = useNavigate()

  const canEditVarieties = hasPermission(UserPermissions.MaintainVarieties)
  const validationMessages = generateValidationMessages(ObjectType.Variety)

  const {
    setData: setVarietyData,
    data: varietyDialogData,
    open: varietyDialogOpen,
    openDialog: openVarietyDialog,
    closeDialog: closeVarietyDialog,
  } = useDialog<IVariety|null>()

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
  } = useDialog<IVariety|null>(null)

  const {
    refresh,
    state: paginationState,
    pagination: pagination
  } = usePagination<IVariety>(VarietyService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, 12)

  const handleCardAction = useCallback((item: IVariety, action: IListAction): void => {
    switch (action.label) {
      case VarietyAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case VarietyAction.View:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openVarietyDialog(item)
        break
      case VarietyAction.Edit:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditVarieties ? GSMode.Edit : GSMode.View }))
        openVarietyDialog(item)
        break
      case VarietyAction.Build:
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditVarieties ? GSMode.Edit : GSMode.View }))
        navigate(`${builderRoutePath}${varietyRoutePath}/${item.id}`)
        break
      default:
        break
    }
  }, [canEditVarieties, openVarietyDialog, openDeleteDialog, navigate])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case VarietyAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openVarietyDialog(defaultVarietyFormData)
        break
      default:
        break
    }
  }, [openVarietyDialog])

  const handleSubmit = useCallback(async (data: IVarietyFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeVarietyDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await VarietyService.create(data)
          toast.success(validationMessages.createSuccess)
        break
        case GSMode.Edit:
          await VarietyService.update(data)
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
  }, [closeVarietyDialog, state.mode, ErrorHandler, VarietyService, refresh, validationMessages.createSuccess, validationMessages.updateSuccess])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await VarietyService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
    }
  }, [closeDeleteDialog, deleteDialogData, ErrorHandler, validationMessages.deleteSuccess, VarietyService, refresh])

  const handleFilePickerAction = useCallback((file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerData) {
          setVarietyData({
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
  }, [setVarietyData, filePickerData, closeFilePickerDialog])

  return (
    <div className={styles.varietyList}>
      <GrubDialog
        open={varietyDialogOpen}
        onClose={closeVarietyDialog}
        title={state.mode == GSMode.New ? "Create a new variety" : varietyDialogData?.name ?? ''}
      >
        <VarietyForm 
          mode={state.mode}
          data={varietyDialogData}
          onClose={closeVarietyDialog}
          onSubmit={handleSubmit}
          isPickerDirty={isPickerDirty}
          onOpenFilePicker={openFilePickerDialog}
        />
      </GrubDialog>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Variety"
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
          actions={canEditVarieties ? VarietyActionsEditMode : VarietyActionsViewMode} 
          onAction={handleCardAction}
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
          <h2 className={styles.warningHeadline}>You do not have any varieties.</h2>
          <p>You will need to create a variety to continue.</p>
          {canEditVarieties && 
            <Button onClick={() => openVarietyDialog(defaultVarietyFormData)} variant="outlined" color="primary">Create a Variety</Button>
          }
        </div>
      }
      {canEditVarieties && 
        <SpeedDialer actions={VarietySpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}