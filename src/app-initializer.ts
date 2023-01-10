import { LazyModulesService } from './core/react-lazy-modules/react-lazy-modules.service'
import { AppModule } from './app.module'

// TODO think about async initializer - maybe useful in the future
export function appInitializer(): void {
  LazyModulesService.loadModule(AppModule)
}
