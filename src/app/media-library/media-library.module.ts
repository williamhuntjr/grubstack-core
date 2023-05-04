import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { IMediaLibraryService } from './media-library.types'
import {
  mediaLibraryServiceToken,
  mediaLibraryModule,
} from './media-library.constants'

export type MediaLibraryModuleDefinition = typeof import('./media-library.exports')

export interface IMediaLibraryModuleService {
  MediaLibraryService: IMediaLibraryService
}

export const MediaLibraryModule: ILazyModule<MediaLibraryModuleDefinition> = {
  name: mediaLibraryModule,
  resolver: () => import('./media-library.exports'),
  initializer: ({
    MediaLibraryService,
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IMediaLibraryService>(mediaLibraryServiceToken, () => new MediaLibraryService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule],
}
