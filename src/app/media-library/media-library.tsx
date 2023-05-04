import React from 'react'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { SpeedDialer } from 'core/components/speed-dialer/speed-dialer'
import { MediaLibrarySpeedActions, imagesList } from './media-library.constants'

import styles from './media-library.module.scss'

export const MediaLibrary = (): JSX.Element => {
  const canEditMediaLibrary = hasPermission(UserPermissions.MaintainMediaLibrary)

  return (
    <div className={styles.mediaLibraryContainer}>
      {imagesList.map((item, index) =>
        <div className={styles.mediaLibraryItem} key={index} style={{backgroundImage: `url(${item.url})`}} />
      )}
      {canEditMediaLibrary && 
        <SpeedDialer actions={MediaLibrarySpeedActions} onAction={() => console.log('test')} />
      }
    </div>
  )
}