import UploadIcon from '@mui/icons-material/Upload'
import { UserPermissions } from 'common/auth/auth.constants'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IMediaLibraryFile, IMediaLibraryState } from './media-library.types'

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
  Delete = 'Delete File',
  Select = 'Select File'
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

export const defaultMediaLibraryFormData:IMediaLibraryFile = {
  id: 0,
  name: '',
  file_size: 0,
  file_type: 'image/png',
  url: '',
}