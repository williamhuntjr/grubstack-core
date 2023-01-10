import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { ProductModule, ProductModuleDefinition } from './products.module'
import { 
  productRoutePath, 
} from './products.constants'
import { ItemsTab } from './product-tabs/items-tab/items-tab'
import { IngredientsTab } from './product-tabs/ingredients-tab/ingredients-tab'
import { MenusTab } from'./product-tabs/menus-tab/menus-tab'
import { VarietiesTab } from './product-tabs/varieties-tab/varieties-tab'

function productRouteFactory({}: ProductModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      redirectTo: `${productRoutePath}/ingredients`,
    },
    {
      path: '/items',
      component: ItemsTab,
    },
    {
      path: '/ingredients',
      component: IngredientsTab,
    },
    {
      path: '/menus',
      component: MenusTab,
    },
    {
      path: '/varieties',
      component: VarietiesTab,
    },
  ]
}

export const productRoute: IAsyncRoute<ProductModuleDefinition> = {
  module: ProductModule,
  path: productRoutePath,
  name: 'Products',
  isSidebarButton: true,
  icon: LocalGroceryStoreIcon,
  childrenRoutesFactory: productRouteFactory
}
