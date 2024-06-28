import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { SpeedDialer } from 'common/components/speed-dialer/speed-dialer'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { GSMode } from 'common/utils/mode/mode.types'
import { Loading } from 'common/components/loading/loading'
import { usePagination } from 'common/hooks/pagination.hook'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { FileUpload } from 'common/components/file-upload/file-upload'
import { useCoreModule } from 'core/core-module-hook'
import { MediaFileList } from 'common/components/media-file-list/media-file-list'
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

  const handleSpeedAction = (action: string): void => {
    switch (action) {
      case MediaLibraryAction.Upload:
        setState((prevState) => ({ ...prevState, mode: GSMode.New }))
        openMediaDialog(defaultMediaLibraryFormData)
        break
      default:
        break
    }
  }

  const handleUpload = async (files: FileList): Promise<void> => {
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
  }

  const handleMediaFileListAction = (item: IMediaLibraryFile, action: MediaLibraryAction): void => {
    switch (action) {
      case MediaLibraryAction.View:
        setState((prevState) => ({ ...prevState, mode: canEditMediaLibrary ? GSMode.Edit : GSMode.View }))
        openMediaDialog(item)
        break
      default:
        break
    }
  }

  const handleClosePreview = (): void => {
    closeMediaDialog()
    void refresh()
  }

  const handleDeleteFile = async (): Promise<void> => {
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
  }

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
      <>
        <h2 className="page-header">Media Library</h2>
        <Divider className={styles.divider}/>
        <MediaFileList 
          data={paginationState.data}
          onAction={handleMediaFileListAction}
          pages={paginationState.pages} 
          page={paginationState.pagination.page}
          onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
            void pagination.onChangePage(page)
          }}
        />
      </>
      }
      {(paginationState.data.length <= 0 && !paginationState.isLoading && !state.isLoading) &&
        <div className={styles.warningMessageContainer}>
          <h2 className={styles.warningHeadline}>You do not have any files in your media library.</h2>
          <p>You will need to upload files to continue.</p>
          <Button onClick={() => openMediaDialog(defaultMediaLibraryFormData)} variant="outlined" color="primary">Upload a File</Button>
        </div>
      }
      {canEditMediaLibrary && 
        <SpeedDialer actions={MediaLibrarySpeedActions} onAction={handleSpeedAction} />
      }
    </div>
  )
}