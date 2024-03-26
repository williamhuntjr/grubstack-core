import React, { FC, memo } from 'react'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { cls } from 'common/utils/utils'
import { IGrubList, IGrubListItem } from './grub-list.types'
import styles from './grub-list.module.scss'

export const GrubList: FC<IGrubList> = memo(({ 
  subHeader, 
  data, 
  onClickAdd, 
  onClickDelete, 
  className, 
  disabled,
  addLabel,
  onClickEdit
}) => {
  
  const generateSecondaryAction = (item: IGrubListItem): JSX.Element => {
    return (
      <>
        {onClickEdit &&
          <IconButton edge="end" aria-label="edit" onClick={() => onClickEdit(item.value)}>
            <EditIcon />
          </IconButton>
        }
        <IconButton edge="end" aria-label="delete" onClick={() => onClickDelete(item.value)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }

  return (
    <List 
      className={cls(styles.grubListContainer, className ?? '')}
      subheader={subHeader ?
        <ListSubheader component="div" id="gs-list-subheader" className={styles.grubListSubHeader}>
          {subHeader}
          <Button color="secondary" variant="contained" disabled={disabled} className={styles.subHeaderButton} onClick={onClickAdd}>{addLabel ?? 'Add'}</Button>
        </ListSubheader>
        : undefined
      }
    >
    {data.map((item, index) => 
      <ListItem 
        disabled={disabled} 
        key={index}
        secondaryAction={generateSecondaryAction(item)}
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
  )
})