import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IItemService } from 'app/products/items/items.types'
import { IMenuService } from 'app/products/menus/menus.types'
import { menuServiceToken } from 'app/products/menus/menus.constants'
import { itemServiceToken } from 'app/products/items/items.constants'
import { IBuilderModuleService, BuilderModule, BuilderModuleDefinition } from './builder.module'

function resolveBuilderModule(): Overwrite<BuilderModuleDefinition, IBuilderModuleService> {
  const ItemService = Injector.resolve<IItemService>(itemServiceToken)
  const MenuService = Injector.resolve<IMenuService>(menuServiceToken)

  const module = LazyModulesService.resolveModule<BuilderModuleDefinition>(BuilderModule)

  return {
    ...module,
    ItemService,
    MenuService,
  }
}

export const useBuilderModule = moduleHookResolver(resolveBuilderModule)
