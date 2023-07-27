import React, { ChangeEvent, FC } from 'react'
import { GrubDialog } from 'core/components/grub-dialog/grub-dialog'
import { MediaFileList } from 'core/components/media-file-list/media-file-list'
import { Loading } from 'core/components/loading/loading'
import { IFilePicker } from './file-picker.types'
import styles from './file-picker.module.scss'

export const FilePicker: FC<IFilePicker> = ({ open, onClose, paginationState, pagination, onAction }) => {
  return (
    <GrubDialog 
      open={open}
      onClose={onClose}
      title={'Select a file from your library'}
    >
      <div className={styles.filePickerContainer}>
        {paginationState.isLoading && <Loading />}
        {paginationState.data.length > 0 && !paginationState.isLoading &&
        <MediaFileList 
          data={paginationState.data}
          onAction={onAction}
          pages={paginationState.pages} 
          page={paginationState.pagination.page}
          onPageChange={(_event: ChangeEvent<unknown>, page: number) => {
            void pagination.onChangePage(page)
          }}
          isPicker={true}
        />
        }
      </div>
    </GrubDialog>
  )
}