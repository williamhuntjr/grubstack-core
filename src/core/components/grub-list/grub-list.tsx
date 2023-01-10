import React, { FC, memo } from 'react'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { cls } from 'common/utils/utils'
import { IGrubList } from './grub-list.types'
import styles from './grub-list.module.scss'

export const GrubList: FC<IGrubList> = memo(({ subHeader, data, onClickAdd, onClickDelete, className }) => {
  return (
    <List 
      className={cls(styles.grubListContainer, className ?? '')}
      subheader={subHeader ?
        <ListSubheader component="div" id="gs-list-subheader" className={styles.grubListSubHeader}>
          {subHeader}
          <Button color="secondary" variant="contained" className={styles.subHeaderButton} onClick={onClickAdd}>Add</Button>
        </ListSubheader>
        : undefined
      }
    >
    {data.map((item, index) => 
      <ListItem disablePadding key={index} secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onClickDelete(item.value)}>
          <DeleteIcon />
        </IconButton>
      }>
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