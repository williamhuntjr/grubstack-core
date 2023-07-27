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
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { FileUpload } from 'core/components/file-upload/file-upload'
import { useCoreModule } from 'core/core-module-hook'
import { MediaFileList } from 'core/components/media-file-list/media-file-list'
import { 
  MediaLibrarySpeedActions, 
  defaultMediaLibraryState, 
  MediaLibraryAction,
  mediaLibraryPageLimit,
  defaultMediaLibraryFormData
} from './media-library.constants'
import { IMediaLibraryFile, IMediaLibraryState } from './media-library.types'
import { useMediaLibraryModule } from './media-library-module-hook'
import { FilePreview } from './file-preview/file-preview'
import styles from './media-library.module.scss'

export const MediaLibrary = (): JSX.Element => {
  const [state, setState] = useState<IMediaLibraryState>(defaultMediaLibraryState)

  const { ErrorHandler } = useCoreModule()
  const { MediaLibraryService } = useMediaLibraryModule()

  const canEditMediaLibrary = hasPermission(UserPermissions.MaintainMediaLibrary)

  const validationMessages = generateValidationMessages(ObjectType.File)

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

  const handleMediaFileListAction = useCallback((item: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.View:
        setState((prevState) => ({ ...prevState, mode: canEditMediaLibrary ? GSMode.Edit : GSMode.New }))
        openMediaDialog(item)
        break
      default:
        break
    }
  }, [openMediaDialog, canEditMediaLibrary])

  const handleClosePreview = useCallback(() => {
    closeMediaDialog()
    void refresh()
  }, [closeMediaDialog, refresh])

  const handleDeleteFile = useCallback(async (): Promise<void> => {
    closeMediaDialog()
    try {
      if (mediaDialogData?.id) {
        await MediaLibraryService.delete(String(mediaDialogData.id))
        toast.success(validationMessages.deleteSuccess)
      }
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    handleClosePreview()
  }, [closeMediaDialog, handleClosePreview, mediaDialogData, MediaLibraryService, ErrorHandler, validationMessages.deleteSuccess])

  return (
    <div className={styles.mediaLibraryContainer}>
      <GrubDialog
        open={mediaDialogOpen}
        onClose={closeMediaDialog}
        title={state.mode == GSMode.New ? "Add to media library" : mediaDialogData?.name ? mediaDialogData?.name : '' ?? ''}
      >
        {state.mode == GSMode.New &&
          <FileUpload onUpload={handleUpload} />
        }
        {state.mode != GSMode.New && mediaDialogData != null &&
          <FilePreview data={mediaDialogData} mode={state.mode} onDelete={handleDeleteFile} />
        }
      </GrubDialog>
      {(paginationState.isLoading || state.isLoading) &&  <Loading />}
      {paginationState.data.length > 0 && !paginationState.isLoading && !state.isLoading &&
      <MediaFileList 
        data={paginationState.data}
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