import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Pagination from '@mui/material/Pagination'
import { IIconCardList, IIconCardListItem } from './icon-card-list.types'
import styles from './icon-card-list.module.scss'

export function IconCardList<TData extends IIconCardListItem, Action>({ 
  data, 
  onAction, 
  actions,
  pages, 
  page,
  onPageChange, 
}: IIconCardList<TData, Action>): React.ReactElement {
  return (
    <div className={styles.iconCardList}>
      <div className={styles.iconCardListRow}>
      {data.map((item, index) =>
        <div className={styles.iconCardListColumn} key={index}>
          <div className={styles.iconCardContainer}>
            <div className={styles.iconCard}>
              <div className={styles.iconContainer}>
                <img src={item.thumbnail_url} alt="" className={styles.iconCardIcon} />
              </div>
              <h3 className={styles.iconCardHeadline}>{item.name}</h3>
              <p className={styles.iconCardDescription}>{item.description}</p>
              <div>
                {actions.map((action, sindex) => 
                  <Tooltip title={action.label} key={sindex}>
                    <IconButton aria-label={action.label} size="large" onClick={() => {
                      onAction(item, (action as unknown) as Action)
                    }}><action.icon /></IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className={styles.paginationContainer}>
      <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
    </div>
  </div>
  )
}