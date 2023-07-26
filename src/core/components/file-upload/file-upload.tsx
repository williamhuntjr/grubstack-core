import React, { FC } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import styles from './file-upload.module.scss'
import { IFileUpload } from './file-upload.types'

export const FileUpload: FC<IFileUpload> = ({ onUpload }) => {  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer?.files

    if (files && files.length) {
      onUpload(files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className={styles.fileUploadContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className={styles.fileUploadIconContainer}>
        <CloudUploadIcon className={styles.fileUploadIcon} />
      </div>
      <p className={styles.fileUploadLabel}>
        Drop your files here to upload
      </p>
      <div className={styles.fileUploadDividerContainer}>
        <Divider className={styles.fileUploadDivider} />
        <p className={styles.fileUploadDividerText}>or</p>
        <Divider className={styles.fileUploadDivider} />
      </div>
      <Button variant="contained" color="primary" size="large">Browse Files</Button>
    </div>
  )
}