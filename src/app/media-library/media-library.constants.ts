import UploadIcon from '@mui/icons-material/Upload'
import { UserPermissions } from 'common/auth/auth.constants'
import { ISpeedDialerAction } from 'core/components/speed-dialer/speed-dialer.types'

export const mediaLibraryServiceToken = 'MediaLibraryService'
export const mediaLibraryModule = 'MediaLibraryModule'

export const mediaLibraryRoutePath = '/media-library'

export const mediaLibraryPermissions = [
  UserPermissions.ViewMediaLibrary,
  UserPermissions.MaintainMediaLibrary
]

export enum MediaLibraryAction {
  Upload = 'Upload File',
}

export const MediaLibrarySpeedActions:ISpeedDialerAction[] = [
  {
    label: MediaLibraryAction.Upload,
    icon: UploadIcon,
  }
]

export const imagesList = [
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
  {
    id: 1,
    name: 'logo',
    filename: 'bobs-burgers.png',
    filesize: 200,
    url: '/uploads/bobs-burgers.png',
  },
]
