import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { ProductModule } from 'app/products/products.module'
import { IItemService } from 'app/products/items/items.types'
import { IMenuService } from 'app/products/menus/menus.types'
import { menuServiceToken } from 'app/products/menus/menus.constants'
import { itemServiceToken } from 'app/products/items/items.constants'
import { builderModule } from './builder.constants'

export type BuilderModuleDefinition = typeof import('./builder.exports')

export interface IBuilderModuleService {
  ItemService: IItemService
  MenuService: IMenuService
}

export const BuilderModule: ILazyModule<BuilderModuleDefinition> = {
  name: builderModule,
  resolver: () => import('./builder.exports'),
  initializer: ({ ItemService, MenuService }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IItemService>(itemServiceToken, () => new ItemService(httpClient), Scope.Singleton)
    Injector.register<IMenuService>(menuServiceToken, () => new MenuService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule, ProductModule],
}
