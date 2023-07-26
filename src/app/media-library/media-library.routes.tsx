import PermMediaIcon from '@mui/icons-material/PermMedia'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { MediaLibraryModule, MediaLibraryModuleDefinition } from './media-library.module'
import { mediaLibraryRoutePath, mediaLibraryPermissions } from './media-library.constants'

function mediaLibraryRouteFactory({ MediaLibrary }: MediaLibraryModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: MediaLibrary,
      permissions: mediaLibraryPermissions,
    },
  ]
}

export const mediaLibraryRoute: IAsyncRoute<MediaLibraryModuleDefinition> = {
  module: MediaLibraryModule,
  path: mediaLibraryRoutePath,
  name: 'Media Library',
  isSidebarButton: true,
  permissions: mediaLibraryPermissions,
  icon: PermMediaIcon,
  childrenRoutesFactory: mediaLibraryRouteFactory
}
