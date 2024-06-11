import React, { FC, useCallback } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { GSMode } from 'common/utils/mode/mode.types'
import { useDialog } from 'common/hooks/dialog.hook'
import { ConfirmationDialog } from 'common/components/confirmation-dialog/confirmation-dialog'
import { generateValidationMessages } from 'common/validation/validation'
import { ObjectType } from 'common/objects'
import { IMediaLibraryFile } from '../media-library.types'
import { generateMediaFileUrl } from '../media-library.utils'
import { IFilePreview } from './file-preview.types'
import styles from './file-preview.module.scss'

export const FilePreview: FC<IFilePreview> = ({ data, mode, onDelete }) => {
  const {
    open: deleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog<IMediaLibraryFile>(data)

  const validationMessages = generateValidationMessages(ObjectType.File)

  const handleExpandFile = (): void => {
    window.location.href = generateMediaFileUrl(data)
  }

  const handleOpenDeleteDialog = useCallback((): void => {
    openDeleteDialog(data)
  }, [openDeleteDialog, data])

  return (
    <div className={styles.filePreviewContainer}>
      <div className={styles.filePreviewImageContainer}>
        <img src={generateMediaFileUrl(data)} alt={data.name} />
      </div>
      <div className={styles.filePreviewInfoContainer}>
        <div className={styles.filePreviewFileSize}>
          <p><strong>File Size:</strong>{data.file_size} bytes</p>
        </div>
        <div className={styles.filePreviewFileType}>
          <p><strong>File Type:</strong>{data.file_type}</p>
        </div>
        {mode == GSMode.Edit &&
          <Divider className={styles.filePreviewDivider} />
        }
        {mode == GSMode.Edit &&
          <div className={styles.filePreviewButtonContainer}>
            <Button variant="contained" color="primary" onClick={handleExpandFile}>Preview File</Button>
            <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>Delete File</Button>
          </div>
        }
      </div>
      <ConfirmationDialog
        open={deleteDialogOpen}
        message={validationMessages.confirmDelete}
        title="Delete File"
        confirmationButtonLabel="Yes, Proceed"
        cancelButtonLabel="Cancel"
        onConfirm={onDelete}
        onClose={closeDeleteDialog}
      />
    </div>
  )
}