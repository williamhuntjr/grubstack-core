import React, { useCallback, useState } from 'react'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { Loading } from 'core/components/loading/loading'
import { GSMode } from 'common/utils/mode/mode.types'
import { IEmployeeState, IEmployee } from './employees.types'
import { defaultEmployeeState, EmployeeSpeedActions, EmployeeAction } from './employees.constants'
import { defaultEmployeeFormData } from './employee-form/employee-form.constants'
import styles from './employees.module.scss'

export const Employees = (): JSX.Element => {
  const [state, setState] = useState<IEmployeeState>(defaultEmployeeState)

  const canEditEmployees = hasPermission(UserPermissions.MaintainMediaLibrary)

  const {
    data: employeeDialogData,
    open: employeeDialogOpen,
    openDialog: openEmployeeDialog,
    closeDialog: closeEmployeeDialog,
  } = useDialog<IEmployee|null>()

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

  return (
    <div className={styles.employeeContainer}>
      <GrubDialog
        open={employeeDialogOpen}
        onClose={closeEmployeeDialog}
        title={state.mode == GSMode.New ? "Create a new employee" : employeeDialogData?.name ?? ''}
      >
      </GrubDialog>
      {state.isLoading &&  <Loading />}

      {canEditEmployees && 
        <SpeedDialer actions={EmployeeSpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}