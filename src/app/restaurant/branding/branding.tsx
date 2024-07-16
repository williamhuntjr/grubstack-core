import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePagination } from 'common/hooks/pagination.hook'
import { FilePicker } from 'common/components/file-picker/file-picker'
import { filePickerSize } from 'common/constants'
import { Loading } from 'common/components/loading/loading'
import { useDialog } from 'common/hooks/dialog.hook'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { getProperty } from '../restaurant.utilities'
import { IProperty } from '../restaurant.types'
import { restaurantBrandingPath, RestaurantProperty } from '../restaurant.constants'
import { IBrandingState } from './branding.types'
import { defaultBrandingState } from './branding.constants'
import { RestaurantName } from './restaurant-name/restaurant-name'
import { RestaurantImages } from './restaurant-images/restaurant-images'
import { RestaurantColors } from './restaurant-colors/restaurant-colors'

export const Branding = (): JSX.Element => {
  const [state, setState] = useState<IBrandingState>(defaultBrandingState)

  const { locationId } = useParams()

  const { LocationService } = useRestaurantModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const canEditLocations = hasPermission(UserPermissions.MaintainLocations)

  const { state: filePickerPaginationState, pagination: filePickerPagination } = usePagination<IMediaLibraryFile>(
    MediaLibraryService.getAll,
    filePickerSize
  )

  const {
    open: filePickerDialogOpen,
    closeDialog: closeFilePickerDialog,
    openDialog: openFilePickerDialog,
    data: filePickerDialogData,
  } = useDialog<string | null>(null)

  const fetchData = async (): Promise<void> => {
    try {
      if (locationId) {
        setState((prevState) => ({ ...prevState, isLoading: true }))
        const resp = await LocationService.getProperties(locationId)
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          properties: resp.data,
        }))
        setState((prevState) => ({ ...prevState, isLoading: false }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateStateProperties = (key: RestaurantProperty, value: string): void => {
    let newPropertiesState: IProperty[] = []
    state.properties.forEach((property) => {
      if (property.key == key) {
        newPropertiesState.push({
          ...property,
          value: value,
        })
      } else {
        newPropertiesState.push({
          ...property,
        })
      }
    })
    setState((prevState) => ({ ...prevState, properties: newPropertiesState }))
  }

  const handlePropertyChange = async (key: string, value: string): Promise<void> => {
    await LocationService.updateProperty(locationId!, { key: key, value: value })
    await fetchData()
  }

  const handleUpdateRestaurantImage = async (key: string, value: string): Promise<void> => {
    try {
      await handlePropertyChange(key, value)
      toast.success('Your restaurant image has been updated.')
      toast.info('The changes may take up to 60 seconds to apply.')
    } catch (e) {
      toast.error('Unable to update restaurant image.')
      console.error(e)
    }
  }

  const handleSaveRestaurantName = async (): Promise<void> => {
    try {
      await handlePropertyChange(RestaurantProperty.RestaurantName, getProperty(state.properties, RestaurantProperty.RestaurantName) ?? '')
      toast.success('Your restaurant name has been updated.')
      toast.info('The changes may take up to 60 seconds to apply.')
    } catch (e) {
      toast.error('Unable to update restaurant name.')
      console.error(e)
    }
  }

  const handleUpdateColor = async (key: string, value: string): Promise<void> => {
    try {
      await handlePropertyChange(key, value)
      toast.success('Your color has been updated.')
      toast.info('The changes may take up to 60 seconds to apply.')
    } catch (e) {
      toast.error('Unable to update color.')
      console.error(e)
    }
  }

  const handleFilePickerAction = async (file: IMediaLibraryFile, action: MediaLibraryAction): Promise<void> => {
    switch (action) {
      case MediaLibraryAction.Select:
        if (filePickerDialogData) {
          closeFilePickerDialog()
          void handleUpdateRestaurantImage(filePickerDialogData, file.url)
        }
        break
      default:
        break
    }
  }

  const handleUpdateRestaurantName = (value: string): void => {
    updateStateProperties(RestaurantProperty.RestaurantName, value)
  }

  // eslint-disable-next-line
  useEffect(() => void fetchData(), [locationId])

  return (
    <RestaurantContainer label={'Branding'} route={restaurantBrandingPath}>
      {state.isLoading && <Loading />}
      {!state.isLoading && (
        <>
          <RestaurantName
            state={state}
            canEditLocations={canEditLocations}
            onUpdate={handleUpdateRestaurantName}
            onSubmit={handleSaveRestaurantName}
          />
          <RestaurantImages state={state} canEditLocations={canEditLocations} onOpenFilePickerDialog={openFilePickerDialog} />
          <RestaurantColors state={state} onUpdate={handleUpdateColor} />
        </>
      )}
      <FilePicker
        open={filePickerDialogOpen}
        onClose={closeFilePickerDialog}
        paginationState={filePickerPaginationState}
        pagination={filePickerPagination}
        onAction={handleFilePickerAction}
      />
    </RestaurantContainer>
  )
}
