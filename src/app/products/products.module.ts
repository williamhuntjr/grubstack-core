import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import {
  productModule,
} from './products.constants'
import { IIngredientService } from './ingredients/ingredients.types'
import { ingredientServiceToken } from './ingredients/ingredients.constants'
import { IItemService } from './items/items.types'
import { itemServiceToken } from './items/items.constants'
import { IMenuService } from './menus/menus.types'
import { menuServiceToken } from './menus/menus.constants'
import { IVarietyService } from './varieties/varieties.types'
import { varietyServiceToken } from './varieties/varieties.constants'

export type ProductModuleDefinition = typeof import('./products.exports')

export interface IProductModuleService {
  IngredientService: IIngredientService
  ItemService: IItemService
  MenuService: IMenuService
  VarietyService: IVarietyService
}

export const ProductModule: ILazyModule<ProductModuleDefinition> = {
  name: productModule,
  resolver: () => import('./products.exports'),
  initializer: ({
    IngredientService,
    ItemService,
    MenuService,
    VarietyService
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IIngredientService>(ingredientServiceToken, () => new IngredientService(httpClient), Scope.Singleton)
    Injector.register<IItemService>(itemServiceToken, () => new ItemService(httpClient), Scope.Singleton)
    Injector.register<IMenuService>(menuServiceToken, () => new MenuService(httpClient), Scope.Singleton)
    Injector.register<IVarietyService>(varietyServiceToken, () => new VarietyService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule],
}
