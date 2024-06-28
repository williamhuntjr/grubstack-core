import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IProductModuleService, ProductModule, ProductModuleDefinition } from './products.module'
import { ingredientServiceToken } from './ingredients/ingredients.constants'
import { IIngredientService } from './ingredients/ingredients.types'
import { itemServiceToken } from './items/items.constants'
import { IItemService } from './items/items.types'
import { menuServiceToken } from './menus/menus.constants'
import { IMenuService } from './menus/menus.types'
import { varietyServiceToken } from './varieties/varieties.constants'
import { IVarietyService } from './varieties/varieties.types'

function resolveProductModule(): Overwrite<ProductModuleDefinition, IProductModuleService> {
  const IngredientService = Injector.resolve<IIngredientService>(ingredientServiceToken)
  const ItemService = Injector.resolve<IItemService>(itemServiceToken)
  const MenuService = Injector.resolve<IMenuService>(menuServiceToken)
  const VarietyService = Injector.resolve<IVarietyService>(varietyServiceToken)

  const module = LazyModulesService.resolveModule<ProductModuleDefinition>(ProductModule)

  return {
    ...module,
    IngredientService,
    ItemService,
    MenuService,
    VarietyService,
  }
}

export const useProductModule = moduleHookResolver(resolveProductModule)
