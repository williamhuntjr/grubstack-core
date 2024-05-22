import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { Loading } from 'core/components/loading/loading'
import { ConfirmationDialog } from 'core/components/confirmation-dialog/confirmation-dialog'
import { usePagination } from 'common/hooks/pagination.hook'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { GSMode } from 'common/utils/mode/mode.types'
import { useCoreModule } from 'core/core-module-hook'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { ILocation, ILocationState } from './locations.types'
import { 
  defaultLocationState,
  locationRoutePath,
  LocationSpeedActions,
  LocationAction
} from './locations.constants'
import { defaultLocationFormData } from './location-form/location-form.constants'
import { LocationForm } from './location-form/location-form'
import styles from './locations.module.scss'

export const Locations = (): JSX.Element => {
  const [state, setState] = useState<ILocationState>(defaultLocationState)

  const { LocationService } = useRestaurantModule()
  const { locationId } = useParams()
  const { ErrorHandler } = useCoreModule()

  const validationMessages = generateValidationMessages(ObjectType.Location)
  const canEditLocations = hasPermission(UserPermissions.MaintainLocations)

  const navigate = useNavigate()
  
  const {
    refresh,
    state: paginationState,
  } = usePagination<ILocation>(LocationService.getAll, 1000)

  const {
    data: locationDialogData,
    open: locationDialogOpen,
    openDialog: openLocationDialog,
    closeDialog: closeLocationDialog,
  } = useDialog<ILocation|null>()

  const {
    data: deleteDialogData,
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<string | null>(null)

  const init = async (): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    if (paginationState.data) {
      if (!locationId && paginationState.data.length > 0) {
        const firstLocationId = paginationState.data[0].id
        navigate(`${locationRoutePath}/${firstLocationId}`)
      }
      else {
        const filtered = paginationState.data.filter((location) => location.id == locationId)
        if (filtered.length > 0) { 
          setState((prevState) => ({ ...prevState, data: filtered[0] }))
        }
      }
    }
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }

  const handleSubmit = useCallback(async (data: ILocation): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      switch (state.mode) {
        case GSMode.New:
          await LocationService.create(data)
          toast.success(validationMessages.createSuccess)
          setState((prevState) => ({ ...prevState, mode: GSMode.Edit }))
          navigate(`${locationRoutePath}`)
        break
        case GSMode.Edit:
          await LocationService.update(data)
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
      closeLocationDialog()
      await refresh()
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }, [state.mode, ErrorHandler, LocationService, validationMessages.createSuccess, validationMessages.updateSuccess, closeLocationDialog, navigate, refresh])

  const openNewLocationDialog = useCallback(() => {
    setState((prevState) => ({ ...prevState, mode: GSMode.New }))
    openLocationDialog(defaultLocationFormData)
  }, [openLocationDialog])

  const handleSpeedAction = (action: string): void => {
    switch (action) {
      case LocationAction.New:
        openNewLocationDialog()
        break
      case LocationAction.Delete:
        if (state.data?.id) {
          openDeleteDialog(state.data.id)
        }
        break 
      default:
        break
    }
  }

  const onDelete = useCallback(async (): Promise<void> => {
    closeDeleteDialog()
    try {
      await LocationService.delete(deleteDialogData ?? '')
      toast.success(validationMessages.deleteSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } finally {
      await refresh()
      navigate(`${locationRoutePath}`)
    }
  }, [closeDeleteDialog, deleteDialogData, ErrorHandler, validationMessages.deleteSuccess, LocationService, refresh, navigate])

  // eslint-disable-next-line
  useEffect(() => void init(), [paginationState.isLoading, locationId])

  useEffect(() => setState((prevState) => ({ ...prevState, mode: GSMode.Edit }))  , [closeLocationDialog])

  return (
    <>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title={`Delete Location`}
        confirmationButtonLabel="Yes, Proceed"
        cancelButtonLabel="Cancel"
        onConfirm={onDelete}
        onClose={closeDeleteDialog}
      />
      {state.isLoading || paginationState.isLoading && <Loading />}
      {!state.isLoading && !paginationState.isLoading &&
      <RestaurantContainer label={paginationState.data.length > 0 ? "Locations" : undefined} route={locationRoutePath}>
        <div className={styles.locationsContainer}>
          {state.data && paginationState.data.length > 0 &&
            <LocationForm 
              data={state.data}
              mode={state.mode}
              onSubmit={handleSubmit}
            />
          }
        </div>
        {paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading &&
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any locations.</h2>
          <p>You will need to add a location to continue.</p>
          {canEditLocations &&
            <Button onClick={() => openNewLocationDialog()} variant="outlined" color="primary">Add a Location</Button>
          }
        </div>
        }
      </RestaurantContainer>
      }
      <GrubDialog
        open={locationDialogOpen}
        onClose={closeLocationDialog}
        title={state.mode == GSMode.New ? "Create a new location" : locationDialogData?.name ?? ''}
      >
        <LocationForm 
          mode={state.mode} 
          data={locationDialogData} 
          onSubmit={handleSubmit}
        />
      </GrubDialog>
      {canEditLocations && 
        <SpeedDialer actions={LocationSpeedActions} onAction={handleSpeedAction} />
      }
    </>
  )
}