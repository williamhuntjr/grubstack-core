import React, { useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { filePickerSize } from 'common/constants'
import { SpeedDialer } from 'common/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { usePagination } from 'common/hooks/pagination.hook'
import { Loading } from 'common/components/loading/loading'
import { GSMode } from 'common/utils/mode/mode.types'
import { useCoreModule } from 'core/core-module-hook'
import { FilePicker } from 'common/components/file-picker/file-picker'
import { ConfirmationDialog } from 'common/components/confirmation-dialog/confirmation-dialog'
import { GrubTable } from 'common/components/grub-table/grub-table'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { ITableAction } from 'common/components/grub-table/grub-table.types'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { GrubList } from 'common/components/grub-list/grub-list'
import { IGrubListItem } from 'common/components/grub-list/grub-list.types'
import { IListAction } from 'common/types/list'
import { IEmployeeState, IEmployee, IEmployeeTableRow } from './employees.types'
import {
  defaultEmployeeState,
  EmployeeSpeedActions,
  EmployeeAction,
  employeeColumns,
  EmployeeTableActionsEditMode,
  EmployeeTableActionsViewMode,
} from './employees.constants'
import { defaultEmployeeFormData } from './employee-form/employee-form.constants'
import { EmployeeForm } from './employee-form/employee-form'
import { IEmployeeFormValues } from './employee-form/employee-form.types'
import { useEmployeeModule } from './employees-module-hook'
import { normalizeData, normalizeListData } from './employees.utils'
import styles from './employees.module.scss'

export const Employees = (): JSX.Element => {
  const { ErrorHandler } = useCoreModule()
  const { MediaLibraryService } = useMediaLibraryModule()
  const { EmployeeService } = useEmployeeModule()

  const [state, setState] = useState<IEmployeeState>(defaultEmployeeState)
  const [isPickerDirty, setIsPickerDirty] = useState<boolean>(false)

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
  } = useDialog<string | null>(null)

  const {
    data: filePickerData,
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog,
  } = useDialog<IEmployee | null>()

  const { refresh, state: paginationState, pagination: pagination } = usePagination<IEmployee>(EmployeeService.getAll, 20)

  const { state: filePickerPaginationState, pagination: filePickerPagination } = usePagination<IMediaLibraryFile>(
    MediaLibraryService.getAll,
    filePickerSize
  )

  const handleSpeedAction = (action: string): void => {
    switch (action) {
      case EmployeeAction.New:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openEmployeeDialog(defaultEmployeeFormData)
        break
      default:
        break
    }
  }

  const handleRowAction = (formatted: IEmployeeTableRow, action: ITableAction): void => {
    let selectedEmployee: IEmployee
    switch (action.label) {
      case EmployeeAction.Delete:
        openDeleteDialog(formatted?.id ?? '')
        break
      case EmployeeAction.View:
        selectedEmployee = paginationState.data.filter((employee) => employee.id == formatted.id)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      case EmployeeAction.Edit:
        selectedEmployee = paginationState.data.filter((employee) => employee.id == formatted.id)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: canEditEmployees ? GSMode.Edit : GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      default:
        break
    }
  }

  const handleListAction = (item: IGrubListItem, action: IListAction): void => {
    let selectedEmployee: IEmployee
    switch (action.label) {
      case EmployeeAction.Delete:
        openDeleteDialog(item?.value ?? '')
        break
      case EmployeeAction.View:
        selectedEmployee = paginationState.data.filter((employee) => employee.id == item.value)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      case EmployeeAction.Edit:
        selectedEmployee = paginationState.data.filter((employee) => employee.id == item.value)[0]
        setIsPickerDirty(false)
        setState((prevState) => ({ ...prevState, selected: selectedEmployee, mode: canEditEmployees ? GSMode.Edit : GSMode.View }))
        openEmployeeDialog(selectedEmployee)
        break
      default:
        break
    }
  }

  const handleSubmit = async (data: IEmployeeFormValues): Promise<void> => {
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
  }

  const onDelete = async (): Promise<void> => {
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
  }

  const handleFilePickerAction = (file: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerData) {
          setEmployeeData({
            ...filePickerData,
            profile_thumbnail_url: file.url,
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
    <div className={styles.employeeContainer}>
      <GrubDialog
        open={employeeDialogOpen}
        onClose={closeEmployeeDialog}
        title={state.mode == GSMode.New ? 'Create a new employee' : `${employeeDialogData.first_name} ${employeeDialogData.last_name}`}
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
      {paginationState.data.length > 0 && !paginationState.isLoading && !state.isLoading && (
        <>
          <h2 className="page-header">Employees</h2>
          <Divider className={styles.divider} />
          <div className={styles.employeeTableContainer}>
            <GrubTable
              columns={employeeColumns}
              data={normalizeData(paginationState.data)}
              onAction={handleRowAction}
              actions={canEditEmployees ? EmployeeTableActionsEditMode : EmployeeTableActionsViewMode}
              pages={paginationState.pages}
              page={paginationState.pagination.page}
              onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
                void pagination.onChangePage(page)
              }}
            />
          </div>
          <div className={styles.employeeListContainer}>
            <GrubList
              subHeader="Employees"
              addLabel="Add Employee"
              onAction={handleListAction}
              actions={canEditEmployees ? EmployeeTableActionsEditMode : EmployeeTableActionsViewMode}
              data={normalizeListData(paginationState.data)}
              pages={paginationState.pages}
              page={paginationState.pagination.page}
              onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
                void pagination.onChangePage(page)
              }}
            />
          </div>
        </>
      )}
      {paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading && (
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any employees.</h2>
          <p>You will need to add an employee to continue.</p>
          {canEditEmployees && (
            <Button onClick={() => openEmployeeDialog(defaultEmployeeFormData)} variant="outlined" color="primary">
              Create an Employee
            </Button>
          )}
        </div>
      )}
      {canEditEmployees && <SpeedDialer actions={EmployeeSpeedActions} onAction={handleSpeedAction} />}
    </div>
  )
}
