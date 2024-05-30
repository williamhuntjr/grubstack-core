import React, { ChangeEvent, useEffect, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { Loading } from 'core/components/loading/loading'
import { CardList } from 'core/components/card-list/card-list'
import { useDialog } from 'common/hooks/dialog.hook'
import { IListAction } from 'common/list.types'
import { usePagination } from 'common/hooks/pagination.hook'
import { useWindowDimensions } from 'common/hooks/window-dimensions.hook'
import { QuickPicker } from 'core/components/quick-picker/quick-picker'
import { useCoreModule } from 'core/core-module-hook'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { IMenu } from 'app/products/menus/menus.types'
import { menuRoutePath } from 'app/products/menus/menus.constants'
import { builderRoutePath } from 'app/builder/builder.constants'
import { useProductModule } from 'app/products/products-module-hook'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { restaurantMenusPath } from '../restaurant.constants'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { ILocationFilters } from '../locations/locations.types'
import { locationRoutePath } from '../locations/locations.constants'
import { 
  FoodMenuAction,
  FoodMenuSpeedActions,
  ValidationLocationMenuMessage,
  FoodMenuActionsEditMode
} from './food-menus.constants'
import styles from './food-menus.module.scss'

export const FoodMenus = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const { ErrorHandler } = useCoreModule()
  const { MenuService } = useProductModule()

  const { LocationService } = useRestaurantModule()
  const { locationId } = useParams()

  const { height } = useWindowDimensions()

  const canEditLocations = hasPermission(UserPermissions.MaintainLocations)

  const navigate = useNavigate()

  const {
    refresh,
    updateFilters,
    state: paginationState,
  } = usePagination<IMenu, ILocationFilters>(LocationService.getMenus, 1000, { id: locationId! })

  const {
    open: quickPickerOpen,
    openDialog: openQuickPickerDialog,
    closeDialog: closeQuickPickerDialog,
  } = useDialog()

  const {
    state: menuPaginationState,
    pagination: menuPagination
  } = usePagination<IMenu>(MenuService.getAll, Math.round((height - 100) / 205) * 2)

  const onAddMenu = useCallback(async (menuData: IMenu): Promise<void> => {
    try {
      await LocationService.addMenu(locationId ?? '', menuData.id ?? '')
      toast.success(ValidationLocationMenuMessage.AddMenuSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } 
    void refresh()
    closeQuickPickerDialog()
  }, [ErrorHandler, LocationService, refresh, locationId, closeQuickPickerDialog])

  const onDeleteMenu = useCallback(async (menuId: string): Promise<void> => {
    try {
      await LocationService.deleteMenu(locationId!, menuId)
      toast.success(ValidationLocationMenuMessage.DeleteMenuSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    void refresh()
  }, [ErrorHandler, LocationService, refresh, locationId])
  
  const handleCardAction = useCallback(async(item: IMenu, action: IListAction): Promise<void> => {
    switch (action.label) {
      case FoodMenuAction.Delete:
        await onDeleteMenu(item?.id ?? '')
        break
      case FoodMenuAction.Build:
        navigate(`${builderRoutePath}${menuRoutePath}/${item.id}`)
        break
      default:
        break
    }
  }, [onDeleteMenu, navigate])

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case FoodMenuAction.Add:
        openQuickPickerDialog()
        break
      default:
        break
    }
  }, [openQuickPickerDialog])

  const checkLocation = async(locationIdToCheck: string): Promise<void> => {
    try {
      setLoading(true)
      await LocationService.get(locationIdToCheck)
      setLoading(false)
    } catch(e) {
      toast.error('The URL provided is invalid')
      navigate(`${locationRoutePath}`)
      console.error(e)
    }
  }

  const init = async (): Promise<void> => {
    try {
      if (!locationId) {
        const { data } = await LocationService.getAll({ page: 1, limit: 100 })
        if (data.length > 0) {
          navigate(`${restaurantMenusPath}/${data[0].id}`)
          setLoading(false)
        }
        else {
          toast.error('You need to add a location first')
          navigate(`${locationRoutePath}`)
        }
      } 
      else {
        await checkLocation(locationId!)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // eslint-disable-next-line
  useEffect(() => void updateFilters({ id: locationId! }), [locationId])

  // eslint-disable-next-line
  useEffect(() => void init(), [])

  return (
    <div className={styles.foodMenusListContainer}>
      {paginationState.isLoading || isLoading && <Loading />}
      {!paginationState.isLoading && !isLoading  &&
      <RestaurantContainer label={"Menus"} route={restaurantMenusPath} routeReload={true}>
        {paginationState.data.length > 0 && !paginationState.isLoading &&
          <CardList 
            data={paginationState.data} 
            onAction={handleCardAction} 
            actions={FoodMenuActionsEditMode} 
            pages={paginationState.pages} 
            page={paginationState.pagination.page}
            onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
              void menuPagination.onChangePage(page)
            }}
            layout="vertical"
            cols={5}
            buttonColor="secondary"
          />
        }
        {paginationState.data.length <= 0 &&
          <div className={styles.warningMessageContainer}>
            <h2 className={styles.warningHeadline}>You do not have any menus for this location.</h2>
            <p>You will need to add a menu to continue.</p>
            {canEditLocations &&
              <Button onClick={() => openQuickPickerDialog()} variant="outlined" color="primary">Add a Menu</Button>
            }
          </div>
        }
      </RestaurantContainer>
      }
      <QuickPicker 
        open={quickPickerOpen} 
        onClose={closeQuickPickerDialog} 
        data={menuPaginationState.data} 
        currentPage={menuPaginationState.pagination.page} 
        pages={menuPaginationState.pages} 
        onClick={onAddMenu} 
        onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
          void menuPagination.onChangePage(page)
        }}
        title="Add a Menu"
      />
      <SpeedDialer actions={FoodMenuSpeedActions} onAction={handleSpeedAction} />
    </div>
 )
}