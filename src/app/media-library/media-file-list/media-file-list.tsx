import React, { FC } from 'react'
import Pagination from '@mui/material/Pagination'
import { appConfig } from 'common/config'
import { IMediaFileList } from './media-file-list.types'
import styles from './media-file-list.module.scss'

export const MediaFileList: FC<IMediaFileList> = ({
  data,
  pages,
  onPageChange,
  page
}) => {
  return (
    <div className={styles.mediaFileListContainer}>
      <div className={styles.mediaFilesContainer}>
        {data.map((item, index) =>
          <div className={styles.mediaFileListItem} key={index} style={{ backgroundImage: `url('${appConfig.cdnUrl}/${appConfig.tenantId}/${item.name}')` }} />
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
      </div>
    </div>
  )
}