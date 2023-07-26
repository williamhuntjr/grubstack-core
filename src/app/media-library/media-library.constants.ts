import UploadIcon from '@mui/icons-material/Upload'
import { UserPermissions } from 'common/auth/auth.constants'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IMediaLibraryState } from './media-library.types'

export const mediaLibraryServiceToken = 'MediaLibraryService'
export const mediaLibraryModule = 'MediaLibraryModule'

export const mediaLibraryRoutePath = '/media-library'

export const mediaLibraryPermissions = [
  UserPermissions.ViewMediaLibrary,
  UserPermissions.MaintainMediaLibrary
]

export enum MediaLibraryAction {
  Upload = 'Upload File',
  View = 'Preview File',
  Delete = 'Delete File'
}

export const MediaLibrarySpeedActions:ISpeedDialerAction[] = [
  {
    label: MediaLibraryAction.Upload,
    icon: UploadIcon,
  }
]

export const defaultMediaLibraryState:IMediaLibraryState = {
  mode: GSMode.New,
  isLoading: false,
}

export const mediaLibraryPageLimit = 30