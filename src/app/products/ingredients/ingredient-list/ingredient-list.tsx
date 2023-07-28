import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { usePagination } from 'common/hooks/pagination.hook'
import { useProductModule } from 'app/products/products-module-hook'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { ObjectType } from 'common/objects'
import { Loading } from 'core/components/loading/loading'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { IListAction } from 'common/list.types'
import { CardList } from 'core/components/card-list/card-list'
import { IIngredient, IIngredientState } from 'app/products/ingredients/ingredients.types'
import { IngredientForm } from 'app/products/ingredients/ingredient-form/ingredient-form'
import { defaultIngredientFormData } from 'app/products/ingredients/ingredient-form/ingredient-form.constants'
import { defaultIngredientState } from 'app/products/ingredients/ingredients.constants'
import { generateValidationMessages } from 'common/validation/validation'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { useCoreModule } from 'core/core-module-hook'
import { FilePicker } from 'core/components/file-picker/file-picker'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { 
  IngredientActionsEditMode, 
  IngredientActionsViewMode, 
  IngredientAction,
  IngredientSpeedActions
} from './ingredient-list.constants'
import { normalizeData, sanitizeData } from './ingredient-list.utils'
import { IIngredientListItem } from './ingredient-list.types'
import styles from './ingredient-list.module.scss'

export const IngredientList: FC = () => {
  const { ErrorHandler } = useCoreModule()
  const { IngredientService } = useProductModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const [ state, setState ] = useState<IIngredientState>(defaultIngredientState)
  const [ isPickerDirty, setIsPickerDirty ] = useState<boolean>(false)

  const canEditIngredients = true
  const validationMessages = generateValidationMessages(ObjectType.Ingredient)

  const {
    setData: setIngredientData,
    data: ingredientDialogData,
    open: ingredientDialogOpen,
    openDialog: openIngredientDialog,
    closeDialog: closeIngredientDialog,
  } = useDialog<IIngredient|null>()

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
    pagination: pagination
  } = usePagination<IIngredient>(IngredientService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, 12)

  const handleListItemAction = useCallback((item: IIngredientListItem, action: IListAction): void => {
    switch (action.label) {
      case IngredientAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case IngredientAction.View:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openIngredientDialog(item)
      break
      case IngredientAction.Edit:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditIngredients ? GSMode.Edit : GSMode.View }))
        openIngredientDialog(item)
        break
      default:
        break
    }
  }, [canEditIngredients, openIngredientDialog, openDeleteDialog])

  const handleSubmit = useCallback(async (data: IIngredientListItem): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeIngredientDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await IngredientService.create(data)
          toast.success(validationMessages.createSuccess)
        break
        case GSMode.Edit:
          await IngredientService.update(sanitizeData(data))
          toast.success(validationMessages.updateSuccess)
        break
        default:
          break
      }
    } catch (e) {
      console.error(e)
      ErrorHandler.handleError(e as Error)
    } 
    finally {
      await refresh()
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }, [closeIngredientDialog, state.mode, ErrorHandler, IngredientService, validationMessages.createSuccess, validationMessages.updateSuccess, refresh])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case IngredientAction.New:
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openIngredientDialog(defaultIngredientFormData)
        break
      default:
        break
    }
  }, [openIngredientDialog])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await IngredientService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
    }
  }, [closeDeleteDialog, deleteDialogData, ErrorHandler, IngredientService, validationMessages.deleteSuccess, refresh])

  const handleFilePickerAction = useCallback((file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (ingredientDialogData) {
          setIngredientData({
            ...ingredientDialogData,
            thumbnail_url: generateMediaFileUrl(file)
          })
        }
        setIsPickerDirty(true)
        closeFilePickerDialog()
        break
      default:
        break
    }
  }, [setIngredientData, ingredientDialogData, closeFilePickerDialog])

  return (
    <div className={styles.ingredientList}>
      <GrubDialog
        open={ingredientDialogOpen}
        onClose={closeIngredientDialog}
        title={state.mode == GSMode.New ? "Create a new ingredient" : ingredientDialogData?.name ?? ''}
      >
        <IngredientForm 
          mode={state.mode} 
          data={ingredientDialogData} 
          onSubmit={handleSubmit}
          onOpenFilePicker={openFilePickerDialog}
          isPickerDirty={isPickerDirty}
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
          data={normalizeData(paginationState.data)}
          actions={canEditIngredients ? IngredientActionsEditMode : IngredientActionsViewMode} 
          onAction={handleListItemAction}
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
          <h2 className={styles.warningHeadline}>You do not have any ingredients.</h2>
          <p>You will need to create an ingredient to continue.</p>
          <Button onClick={() => openIngredientDialog(defaultIngredientFormData)} variant="outlined" color="primary">Create an Ingredient</Button>
        </div>
      }
      {canEditIngredients && 
        <SpeedDialer actions={IngredientSpeedActions} onAction={handleSpeedAction} />
      }
    </div>  
  )
}