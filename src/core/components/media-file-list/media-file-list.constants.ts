import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'

export const MediaFileListActionsViewMode = [
  {
    label: MediaLibraryAction.View,
    icon: VisibilityIcon,
  },
]

export const MediaFileListActionsEditMode = [
  {
    label: MediaLibraryAction.View,
    icon: VisibilityIcon,
  },
  {
    label: MediaLibraryAction.Delete,
    icon: DeleteIcon,
  }
]