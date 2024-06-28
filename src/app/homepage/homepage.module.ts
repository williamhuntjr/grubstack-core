import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { ProductModule } from 'app/products/products.module'
import { homepageModule } from './homepage.constants'

export type HomepageModuleDefinition = typeof import('./homepage.exports')

export const HomepageModule: ILazyModule<HomepageModuleDefinition> = {
  name: homepageModule,
  resolver: () => import('./homepage.exports'),
  dependencies: [ProductModule],
}
