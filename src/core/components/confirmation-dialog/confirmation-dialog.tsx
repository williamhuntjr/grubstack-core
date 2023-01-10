import React, { FC } from 'react'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import styles from './confirmation-dialog.module.scss'

export interface IConfirmationDialogParams {
  open: boolean
  message: string
  title?: string
  confirmationButtonLabel: string
  cancelButtonLabel?: string
  ariaLabel?: string
  ariaDescription?: string
  onConfirm(): void
  onClose(): void
}

export const ConfirmationDialog: FC<IConfirmationDialogParams> = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmationButtonLabel,
  cancelButtonLabel,
  title,
  ariaLabel,
  ariaDescription,
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby={ariaLabel} aria-describedby={ariaDescription}>
    <div className={styles.confirmationDialogContainer}>
      <h4 hidden={!title} className={styles.confirmationDialogTitle}>
        {title}
      </h4>
      <p className={styles.confirmationMessage}>{message}</p>
      <Divider />
      <div className={styles.confirmationDialogButtonContainer}>
        <Button variant="contained" color="secondary" onClick={onClose} className={styles.confirmationDialogButton}>{cancelButtonLabel ?? 'Cancel'}</Button>
        <Button variant="contained" onClick={onConfirm} className={styles.confirmationDialogButton}>{confirmationButtonLabel}</Button>
      </div>
    </div>
  </Dialog>
)