import React, { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { cls } from 'common/utils/utils'
import { usePagination } from 'common/hooks/pagination.hook'
import { FilePicker } from 'common/components/file-picker/file-picker'
import { filePickerSize } from 'common/constants'
import { Loading } from 'common/components/loading/loading'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { IMediaLibraryFile } from 'app/media-library/media-library.types'
import { useMediaLibraryModule } from 'app/media-library/media-library-module-hook'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { RestaurantProperty } from '../restaurant.constants'
import { IBrandingState } from './branding.types'
import { defaultBrandingState } from './branding.constants'
import styles from './branding.module.scss'

export const Branding = (): JSX.Element => {
  const [ state, setState ] = useState<IBrandingState>(defaultBrandingState)

  const [ isPickerOpen, setIsPickerOpen ] = useState<boolean>(false)
  const [ currentKey, setCurrentKey ] = useState<string>('')

  const { RestaurantService } = useRestaurantModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const {
    state: filePickerPaginationState,
    pagination: filePickerPagination,
    refresh: refreshFilePicker
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, filePickerSize)

  const init = useCallback(async(): Promise<void> => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      const restaurantName = await RestaurantService.getProperty('restaurant_name')
      const logoImageUrl = await RestaurantService.getProperty('logo_image_url')
      const bannerImageUrl = await RestaurantService.getProperty('banner_image_url')
      const mobileBannerImageUrl = await RestaurantService.getProperty('mobile_banner_image_url')
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        restaurantName: restaurantName.data.value ?? '',
        logoImageUrl: logoImageUrl.data.value ?? '/assets/img/placeholder-image.jpg',
        bannerImageUrl: bannerImageUrl.data.value ?? '/assets/img/placeholder-image.jpg',
        mobileBannerImageUrl: mobileBannerImageUrl.data.value ?? '/assets/img/placeholder-image.jpg'
      }))
      setState((prevState) => ({ ...prevState, isLoading: false }))
    } catch (e) {
      console.error(e)
    }
  }, [RestaurantService])

  const handleOpenPicker = useCallback((key: string): void => {
    if (filePickerPaginationState.pagination.page != 1) {
      filePickerPaginationState.pagination.page = 1
      void refreshFilePicker()
    }
    setIsPickerOpen(true)
    setCurrentKey(key)
  }, [filePickerPaginationState.pagination, refreshFilePicker])

  const handlePropertyChange = useCallback(async (key: string, value: string): Promise<void> => {
    try {
      setIsPickerOpen(false)
      const params = { 'key': key, 'value': value }
      await RestaurantService.updateProperty(params)
      await init()
    } catch (e) {
      console.error(e)
    }
  }, [RestaurantService, init])

  const handleFilePickerAction = useCallback(async(file: IMediaLibraryFile, action: MediaLibraryAction): Promise<void> => {
    switch (action) {
      case MediaLibraryAction.Select:
        void handlePropertyChange(currentKey, file.url)
        break
      default:
        break
    }
  }, [currentKey, handlePropertyChange])

  const saveRestaurantName = useCallback(async (): Promise<void> => {
    await handlePropertyChange(RestaurantProperty.RestaurantName, state.restaurantName)
  }, [handlePropertyChange, state.restaurantName])

  // eslint-disable-next-line
  useEffect(() => void init(), [])

  return (
    <RestaurantContainer label={"Branding"}>
      {state.isLoading && <Loading />}
      {!state.isLoading &&
      <div className={styles.brandingContainer}>
        <div className={styles.restaurantName}>
          <h4>Restaurant Name</h4>
          <TextField
            id="restaurant-name"
            variant="outlined"
            className={styles.textField}
            value={state.restaurantName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setState((prevState) => ({
                ...prevState,
                restaurantName: event.target.value
              }))
            }}
          />
          <div className={styles.buttonContainer}>
            <Button variant="contained" color="primary" onClick={() => void saveRestaurantName()}>Save</Button>
          </div>
        </div>
        <div className={styles.storeImages}>
          <div className={cls(styles.imageContainer, styles.logoContainer)}>
            <div className={styles.imageContent}>
              <h4>Logo Image</h4>
              <p className={styles.subTitle}>This image is used throughout your apps as your primary logo</p>
              <img src={state.logoImageUrl} alt="" />
              <div className={styles.buttonContainer}>
                <Button variant="contained" color="primary" size="large" onClick={() => handleOpenPicker(RestaurantProperty.LogoImageUrl)}>Change</Button>
              </div>
            </div>
          </div>
          <div className={cls(styles.imageContainer, styles.logoContainer)}>
            <div className={styles.imageContent}>
              <h4>Home Banner Image</h4>
              <p className={styles.subTitle}>This is the banner image on your order app home page</p>
              <img src={state.bannerImageUrl} alt="" />
              <div className={styles.buttonContainer}>
                <Button variant="contained" color="primary" size="large" onClick={() => handleOpenPicker(RestaurantProperty.BannerImageUrl)}>Change</Button>
              </div>
            </div>
          </div>
          <div className={cls(styles.imageContainer, styles.logoContainer)}>
            <div className={styles.imageContent}>
              <h4>Mobile Home Banner Image</h4>
              <p className={styles.subTitle}>This is the mobile banner image on your order app home page</p>
              <img src={state.mobileBannerImageUrl} alt="" />
              <div className={styles.buttonContainer}>
                <Button variant="contained" color="primary" size="large" onClick={() => handleOpenPicker(RestaurantProperty.MobileBannerImageUrl)}>Change</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      <FilePicker
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        paginationState={filePickerPaginationState}
        pagination={filePickerPagination}
        onAction={handleFilePickerAction}
      />
    </RestaurantContainer>
  )
}