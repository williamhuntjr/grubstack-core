import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { ProductModule, ProductModuleDefinition } from './products.module'
import { 
  itemPermissions,
  ingredientPermissions,
  menuPermissions,
  varietyPermissions,
  productPermissions,
  productRoutePath, 
} from './products.constants'
import { ItemsTab } from './product-tabs/items-tab/items-tab'
import { IngredientsTab } from './product-tabs/ingredients-tab/ingredients-tab'
import { MenusTab } from'./product-tabs/menus-tab/menus-tab'
import { VarietiesTab } from './product-tabs/varieties-tab/varieties-tab'
import { Products } from './products'

function productRouteFactory({}: ProductModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Products,
      permissions: [],
    },
    {
      path: '/items',
      component: ItemsTab,
      permissions: itemPermissions,
    },
    {
      path: '/ingredients',
      component: IngredientsTab,
      permissions: ingredientPermissions,
    },
    {
      path: '/menus',
      component: MenusTab,
      permissions: menuPermissions,
    },
    {
      path: '/varieties',
      component: VarietiesTab,
      permissions: varietyPermissions,
    },
  ]
}

export const productRoute: IAsyncRoute<ProductModuleDefinition> = {
  module: ProductModule,
  path: productRoutePath,
  name: 'Products',
  isSidebarButton: true,
  permissions: productPermissions,
  icon: LocalGroceryStoreIcon,
  childrenRoutesFactory: productRouteFactory
}
