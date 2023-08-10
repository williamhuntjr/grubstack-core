import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { usePagination } from 'common/hooks/pagination.hook'
import { Loading } from 'core/components/loading/loading'
import { GSMode } from 'common/utils/mode/mode.types'
import { useCoreModule } from 'core/core-module-hook'
import { FilePicker } from 'core/components/file-picker/file-picker'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { GrubTable } from 'core/components/grub-table/grub-table'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { ITableAction } from 'core/components/grub-table/grub-table.types'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { IEmployeeState, IEmployee, IEmployeeTableRow } from './employees.types'
import { 
  defaultEmployeeState, 
  EmployeeSpeedActions, 
  EmployeeAction, 
  employeeColumns, 
  EmployeeTableActionsEditMode,
  EmployeeTableActionsViewMode
} from './employees.constants'
import { defaultEmployeeFormData } from './employee-form/employee-form.constants'
import { EmployeeForm } from './employee-form/employee-form'
import { IEmployeeFormValues } from './employee-form/employee-form.types'
import { useEmployeeModule } from './employees-module-hook'
import { normalizeData } from './employees.utils'
import styles from './employees.module.scss'

export const Employees = (): JSX.Element => {
  const { ErrorHandler } = useCoreModule()
  const { MediaLibraryService } = useMediaLibraryModule()
  const { EmployeeService } = useEmployeeModule()

  const [ state, setState ] = useState<IEmployeeState>(defaultEmployeeState)
  const [ isPickerDirty, setIsPickerDirty ] = useState<boolean>(false)

  const canEditEmployees = hasPermission(UserPermissions.MaintainEmployees)
  const validationMessages = generateValidationMessages(ObjectType.Employee)

  const {
    setData: setEmployeeData,
    data: employeeDialogData,
    open: employeeDialogOpen,
    openDialog: openEmployeeDialog,
    closeDialog: closeEmployeeDialog,
  } = useDialog<IEmployee>(defaultEmployeeFormData)

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<number|null>(null)

  const {
    data: filePickerData,
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog
  } = useDialog<IEmployee|null>()

  const {
    refresh,
    state: paginationState,
    pagination: pagination
  } = usePagination<IEmployee>(EmployeeService.getAll)

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, 12)

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case EmployeeAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openEmployeeDialog(defaultEmployeeFormData)
        break
      default:
        break
    }
  }, [openEmployeeDialog])

  const handleRowAction = useCallback((formatted: IEmployeeTableRow, action: ITableAction): void => {
    let selectedEmployee:IEmployee
    switch (action.label) {
      case EmployeeAction.Delete:
        openDeleteDialog(formatted?.id ?? null)
        break
      case EmployeeAction.View:
        selectedEmployee = paginationState.data.filter(employee => employee.id == formatted.id)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      case EmployeeAction.Edit:
        selectedEmployee = paginationState.data.filter(employee => employee.id == formatted.id)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: canEditEmployees ? GSMode.Edit : GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      default:
        break
    }
  }, [openEmployeeDialog, openDeleteDialog, canEditEmployees, paginationState.data])

  const handleSubmit = useCallback(async (data: IEmployeeFormValues): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    closeEmployeeDialog()
    try {
      switch (state.mode) {
        case GSMode.New:
          await EmployeeService.create(data)
          toast.success(validationMessages.createSuccess)
        break
        case GSMode.Edit:
          await EmployeeService.update(data)
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
  }, [closeEmployeeDialog, state.mode, ErrorHandler, EmployeeService, refresh, validationMessages.createSuccess, validationMessages.updateSuccess])

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      if (deleteDialogData) {
        await EmployeeService.delete(deleteDialogData)
        toast.success(validationMessages.deleteSuccess)
      }
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await pagination.onChangePage(1)
    }
  }, [closeDeleteDialog, deleteDialogData, ErrorHandler, validationMessages.deleteSuccess, EmployeeService, pagination])

  const handleFilePickerAction = useCallback((file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerData) {
          setEmployeeData({
            ...filePickerData,
            profile_thumbnail_url: generateMediaFileUrl(file)
          })
        }
        setIsPickerDirty(true)
        closeFilePickerDialog()
        break
      default:
        break
    }
  }, [setEmployeeData, filePickerData, closeFilePickerDialog])

  return (
    <div className={styles.employeeContainer}>
      <GrubDialog
        open={employeeDialogOpen}
        onClose={closeEmployeeDialog}
        title={state.mode == GSMode.New ? "Create a new employee" : `${employeeDialogData.first_name} ${employeeDialogData.last_name}` }
      >
        <EmployeeForm  
          mode={state.mode} 
          data={employeeDialogData} 
          onSubmit={handleSubmit}
          isPickerDirty={isPickerDirty}
          onOpenFilePicker={openFilePickerDialog}
        />
      </GrubDialog>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete Employee"
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
      {state.isLoading && paginationState.isLoading && <Loading />}
      {!state.isLoading &&
      <GrubTable
        columns={employeeColumns}
        data={normalizeData(paginationState.data)}
        onAction={handleRowAction}
        actions={canEditEmployees ? EmployeeTableActionsEditMode : EmployeeTableActionsViewMode }
      />
      }
      {canEditEmployees && 
        <SpeedDialer actions={EmployeeSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}