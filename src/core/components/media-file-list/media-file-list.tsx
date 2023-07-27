import React, { FC } from 'react'
import Pagination from '@mui/material/Pagination'
import { generateMediaFileUrl } from 'app/media-library/media-library.utils'
import { MediaLibraryAction } from 'app/media-library/media-library.constants'
import { IMediaFileList } from './media-file-list.types'
import styles from './media-file-list.module.scss'

export const MediaFileList: FC<IMediaFileList> = ({
  data,
  pages,
  onPageChange,
  page,
  onAction,
  isPicker
}) => {
  return (
    <div className={styles.mediaFileListContainer}>
      <div className={styles.mediaFilesContainer}>
        {data.map((item, index) =>
          <div
            className={styles.mediaFileListItem} 
            key={index} 
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.preventDefault}
            onClick={() => onAction(item, isPicker ? MediaLibraryAction.Select : MediaLibraryAction.View)}
            style={{ backgroundImage: `url('${generateMediaFileUrl(item)}')` }} 
          />
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
      </div>
    </div>
  )
}