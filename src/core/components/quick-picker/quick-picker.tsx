import React, { ChangeEvent, FC } from 'react'
import { Dialog, DialogTitle }  from '@mui/material'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import { TransitionProps } from '@mui/material/transitions'
import { CardList } from 'core/components/card-list/card-list'
import { IQuickPicker } from './quick-picker.types'
import styles from './quick-picker.module.scss'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />
})

export const QuickPicker: FC<IQuickPicker> = ({ open, onClose, title = 'Quick Picker', data, currentPage, pages, onClick, onPageChange }): JSX.Element => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen={true}
      open={open}
      onClose={onClose}
      aria-labelledby="quick-picker-dialog-title"
      className={styles.quickPickerDialog}
    >
      <DialogTitle id="quick-picker-dialog-title" className={styles.dialogTitle}>
        <div className={styles.dialogTitleContent}>
          <div className={styles.dialogTitleText}>
            {title}
          </div>
          <div className={styles.dialogTitleActions}>
            <Button onClick={onClose} variant="contained" color="secondary" className={styles.dialogActionButton}>
              Close
            </Button>
          </div>
        </div>
      </DialogTitle>
      <div className={styles.cardListContainer}>
        <CardList 
          data={data}
          onClick={onClick}
          pages={pages} 
          page={currentPage}
          onPageChange={(event: ChangeEvent<unknown>, page: number) => onPageChange(event, page)}
          layout="vertical"
          buttonColor="secondary"
          cols={2}
        />
      </div>
    </Dialog>
  )
}