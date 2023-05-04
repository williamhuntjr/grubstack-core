import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IMediaLibraryModuleService, MediaLibraryModule, MediaLibraryModuleDefinition } from './media-library.module'
import { mediaLibraryServiceToken } from './media-library.constants'
import { IMediaLibraryService } from './media-library.types'

function resolveMediaLibraryModule(): Overwrite<MediaLibraryModuleDefinition, IMediaLibraryModuleService> {
  const MediaLibraryService = Injector.resolve<IMediaLibraryService>(mediaLibraryServiceToken)

  const module = LazyModulesService.resolveModule<MediaLibraryModuleDefinition>(MediaLibraryModule)

  return {
    ...module,
    MediaLibraryService,
  }
}

export const useMediaLibraryModule = moduleHookResolver(resolveMediaLibraryModule)
