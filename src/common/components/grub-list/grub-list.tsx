import React, { FC, memo } from 'react'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Pagination from '@mui/material/Pagination'
import { cls } from 'common/utils/utils'
import { IGrubList, IGrubListItem } from './grub-list.types'
import styles from './grub-list.module.scss'

export const GrubList: FC<IGrubList> = memo(({ 
  subHeader, 
  data,
  className, 
  disabled,
  addLabel,
  actions,
  onAction,
  onClickAdd,
  pages,
  page,
  onPageChange
}) => {
  const generateActions = (item: IGrubListItem): JSX.Element => {
    if (onAction) {
      return (
        <div className={styles.grubListActions}>
          {actions?.map((action, index) =>
          <div className={styles.buttonContainer} key={index}>
              <IconButton edge="end" aria-label="edit" onClick={() => onAction(item, action)}>
                <action.icon />
              </IconButton>
            </div>
          )}
        </div>
      )
    }
    return <></>
  }

  return (
    <>
    <List 
      className={cls(styles.grubListContainer, className ?? '')}
      subheader={subHeader ?
        <ListSubheader component="div" id="gs-list-subheader" className={styles.grubListSubHeader}>
          {subHeader}
          {onClickAdd &&
              <Button color="primary" variant="contained" size="small" disabled={disabled} className={styles.subHeaderButton} onClick={onClickAdd}>{addLabel ?? 'Add'}</Button>
          }
        </ListSubheader>
        : undefined
      }
    >
    {data.map((item, index) => 
      <ListItem 
        disabled={disabled} 
        key={index}
        secondaryAction={generateActions(item)}
      >
        <ListItemButton>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    )}
    {data.length === 0 &&
      <ListItem disablePadding disabled>
        <ListItemButton>
          <ListItemText primary={"Click Add to begin"} />
        </ListItemButton>
      </ListItem>
    }
    </List>
    {data.length != 0 && page && pages &&
      <div className={styles.paginationContainer}>
        <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
      </div>
      }
    </>
  )
})