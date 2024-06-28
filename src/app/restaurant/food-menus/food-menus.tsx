import React, { ChangeEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { Loading } from 'common/components/loading/loading'
import { CardList } from 'common/components/card-list/card-list'
import { useDialog } from 'common/hooks/dialog.hook'
import { IListAction } from 'common/types/list'
import { usePagination } from 'common/hooks/pagination.hook'
import { useWindowDimensions } from 'common/hooks/window-dimensions.hook'
import { QuickPicker } from 'common/components/quick-picker/quick-picker'
import { useCoreModule } from 'core/core-module-hook'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { IMenu } from 'app/products/menus/menus.types'
import { menuRoutePath } from 'app/products/menus/menus.constants'
import { builderRoutePath } from 'app/builder/builder.constants'
import { useProductModule } from 'app/products/products-module-hook'
import { SpeedDialer } from 'common/components/speed-dialer/speed-dialer'
import { restaurantMenusPath } from '../restaurant.constants'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { ILocationFilters } from '../locations/locations.types'
import { 
  FoodMenuAction,
  FoodMenuSpeedActions,
  ValidationLocationMenuMessage,
  FoodMenuActionsEditMode
} from './food-menus.constants'
import styles from './food-menus.module.scss'

export const FoodMenus = (): JSX.Element => {
  const { ErrorHandler } = useCoreModule()
  const { MenuService } = useProductModule()

  const { LocationService } = useRestaurantModule()
  const { locationId } = useParams()

  const { height } = useWindowDimensions()

  const canEditLocations = hasPermission(UserPermissions.MaintainRestaurant)

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

  const onAddMenu = async (menuData: IMenu): Promise<void> => {
    try {
      await LocationService.addMenu(locationId ?? '', menuData.id ?? '')
      toast.success(ValidationLocationMenuMessage.AddMenuSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    } 
    void refresh()
    closeQuickPickerDialog()
  }

  const onDeleteMenu = async (menuId: string): Promise<void> => {
    try {
      await LocationService.deleteMenu(locationId!, menuId)
      toast.success(ValidationLocationMenuMessage.DeleteMenuSuccess)
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    void refresh()
  }
  
  const handleCardAction = async(item: IMenu, action: IListAction): Promise<void> => {
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
  }

  const handleSpeedAction = (action: string): void => {
    switch (action) {
      case FoodMenuAction.Add:
        openQuickPickerDialog()
        break
      default:
        break
    }
  }

  // eslint-disable-next-line
  useEffect(() => void updateFilters({ id: locationId! }), [locationId])

  return (
    <div className={styles.foodMenusListContainer}>
      {paginationState.isLoading && <Loading />}
      {!paginationState.isLoading &&
      <RestaurantContainer label={"Menus"} route={restaurantMenusPath}>
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