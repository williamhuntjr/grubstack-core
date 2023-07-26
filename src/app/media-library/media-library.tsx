import React, { useCallback, ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { Loading } from 'core/components/loading/loading'
import { usePagination } from 'common/hooks/pagination.hook'
import { FileUpload } from 'core/components/file-upload/file-upload'
import { IListAction } from 'common/list.types'
import { defaultMediaLibraryFormData } from './media-library-form/media-library-form.constants'
import { 
  MediaLibrarySpeedActions, 
  defaultMediaLibraryState, 
  MediaLibraryAction,
  mediaLibraryPageLimit
} from './media-library.constants'
import { IMediaLibraryFile, IMediaLibraryState } from './media-library.types'
import { useMediaLibraryModule } from './media-library-module-hook'
import { MediaFileList } from './media-file-list/media-file-list'
import { MediaFileListActionsEditMode, MediaFileListActionsViewMode } from './media-file-list/media-file-list.constants'
import styles from './media-library.module.scss'

export const MediaLibrary = (): JSX.Element => {
  const [state, setState] = useState<IMediaLibraryState>(defaultMediaLibraryState)

  const { MediaLibraryService } = useMediaLibraryModule()

  const canEditMediaLibrary = hasPermission(UserPermissions.MaintainMediaLibrary)

  const {
    data: mediaDialogData,
    open: mediaDialogOpen,
    openDialog: openMediaDialog,
    closeDialog: closeMediaDialog,
  } = useDialog<IMediaLibraryFile|null>()

  const {
    refresh,
    state: paginationState,
    pagination: pagination
  } = usePagination<IMediaLibraryFile>(MediaLibraryService.getAll, mediaLibraryPageLimit)

  const handleSpeedAction = useCallback((action: string): void => {
    switch (action) {
      case MediaLibraryAction.Upload:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openMediaDialog(defaultMediaLibraryFormData)
        break
      default:
        break
    }
  }, [openMediaDialog])

  const handleUpload = useCallback(async (files: FileList): Promise<void> => {
    await toast.promise(
      MediaLibraryService.uploadFiles(files),
      {
        pending: 'Your files are uploading',
        success: 'File upload complete',
        error: 'Unable to upload files'
      }
    )
    closeMediaDialog()
    void refresh()
  }, [closeMediaDialog, refresh, MediaLibraryService])

  const handleMediaFileListAction = useCallback((item: IMediaLibraryFile, action: IListAction): void => {
    console.log(item, action)
  }, [])

  return (
    <div className={styles.mediaLibraryContainer}>
      <GrubDialog
        open={mediaDialogOpen}
        onClose={closeMediaDialog}
        title={state.mode == GSMode.New ? "Add to media library" : mediaDialogData?.name ?? ''}
      >
        <FileUpload onUpload={handleUpload} />
      </GrubDialog>
      {(paginationState.isLoading || state.isLoading) &&  <Loading />}
      {paginationState.data.length > 0 && !paginationState.isLoading && !state.isLoading &&
      <MediaFileList 
        data={paginationState.data}
        actions={canEditMediaLibrary ? MediaFileListActionsEditMode : MediaFileListActionsViewMode} 
        onAction={handleMediaFileListAction}
        pages={paginationState.pages} 
        page={paginationState.pagination.page}
        onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
          void pagination.onChangePage(page)
        }}
      />
      }
      {canEditMediaLibrary && 
        <SpeedDialer actions={MediaLibrarySpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}