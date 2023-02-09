import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { usePagination } from 'common/hooks/pagination.hook'
import { useCoreModule } from 'core/core-module-hook'
import { Loading } from 'core/components/loading/loading'
import { builderRoutePath } from 'app/builder/builder.constants'
import { useProductModule } from 'app/products/products-module-hook'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { CardList } from 'core/components/card-list/card-list'
import { IListAction } from 'common/list.types'
import { IItem, IItemState } from 'app/products/items/items.types'
import { defaultItemState, itemRoutePath } from 'app/products/items/items.constants'
import { defaultItemFormData } from 'app/products/items/item-form/item-form.constants'
import { IItemFormValues } from 'app/products/items/item-form/item-form.types'
import { ItemForm } from 'app/products/items/item-form/item-form'
import { ItemActionsEditMode, ItemActionsViewMode, ItemSpeedActions, ItemAction } from './item-list.constants'
import styles from './item-list.module.scss'

export const ItemList: FC = () => {
  const { ErrorHandler } = useCoreModule()
  const { ItemService } = useProductModule()

  const [state, setState] = useState<IItemState>(defaultItemState)

  let navigate = useNavigate()

  const canEditItems = true
  const validationMessages = generateValidationMessages(ObjectType.Item)

  const {
    data: itemDialogData,
    open: itemDialogOpen,
    openDialog: openItemDialog,
    closeDialog: closeItemDialog,
  } = useDialog<IItem|null>()

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
  } = usePagination<IItem>(ItemService.getAll)

  const handleCardAction = useCallback((item: IItem, action: IListAction): void => {
    switch (action.label) {
      case ItemAction.Delete:
        openDeleteDialog(item?.id ?? '')
        break
      case ItemAction.View:
        setState((prevState) => ({ ...prevState, selected: item, mode: GSMode.View }))
        openItemDialog(item)
        break
      case ItemAction.Edit:
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditItems ? GSMode.Edit : GSMode.View }))
        openItemDialog(item)
        break
      case ItemAction.Build:
        setState((prevState) => ({ ...prevState, selected: item, mode: canEditItems ? GSMode.Edit : GSMode.View }))
        navigate(`${builderRoutePath}${itemRoutePath}/${item.id}`)
        break
      default:
        break
    }
  }, [canEditItems, openItemDialog, openDeleteDialog, navigate])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case ItemAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openItemDialog(defaultItemFormData)
        break
      default:
        break
    }
  }, [openItemDialog])

  const handleSubmit = useCallback(async (data: IItemFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeItemDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await ItemService.create(data)
          toast.success(validationMessages.createSuccess)
        break
        case GSMode.Edit:
          await ItemService.update(data)
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
  }, [closeItemDialog, state.mode, ErrorHandler, ItemService, refresh, validationMessages.createSuccess, validationMessages.updateSuccess])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await ItemService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
    }
  }, [closeDeleteDialog, deleteDialogData, ErrorHandler, validationMessages.deleteSuccess, ItemService, refresh])

  return (
    <div className={styles.itemList}>
      <GrubDialog
        open={itemDialogOpen}
        onClose={closeItemDialog}
        title={state.mode == GSMode.New ? "Create a new item" : itemDialogData?.name ?? ''}
      >
        <ItemForm mode={state.mode} data={itemDialogData} onClose={closeItemDialog} onSubmit={handleSubmit}/>
      </GrubDialog>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Item"
        confirmationButtonLabel="Yes, Proceed"
        cancelButtonLabel="Cancel"
        onConfirm={onDelete}
        onClose={closeDeleteDialog}
      />
      {(paginationState.isLoading || state.isLoading) &&  <Loading />}
      {paginationState.data.length > 0 && !paginationState.isLoading && !state.isLoading &&
        <CardList 
          data={paginationState.data}
          actions={canEditItems ? ItemActionsEditMode : ItemActionsViewMode} 
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
          <h2 className={styles.warningHeadline}>You do not have any items.</h2>
          <p>You will need to create an item to continue.</p>
          <Button onClick={() => openItemDialog(defaultItemFormData)} variant="outlined" color="primary">Create an Item</Button>
        </div>
      }
      {canEditItems && 
        <SpeedDialer actions={ItemSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}