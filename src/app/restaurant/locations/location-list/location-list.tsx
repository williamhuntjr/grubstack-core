import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { cls } from 'common/utils/utils'
import { ILocationList } from './location-list.types'
import styles from './location-list.module.scss'

export const LocationList: FC<ILocationList> = ({ locations, routePath, locationId }) => {
  const navigate = useNavigate()

  return (
    <List className={styles.locationList}>
    {locations?.map((location, index) => 
      <ListItem 
        disablePadding 
        key={`location-${index}`} 
        className={cls(styles.listItem, locationId! == location.id ? styles.activeLocation : '')}
      >
        <div className={cls(styles.statusCircle, location.is_active ? styles.greenCircle : styles.redCircle)} />
        <ListItemButton onClick={() => navigate(`${routePath}/${location.id}`)}>
          <ListItemText primary={location.name} />
          <div className={styles.circleIcon}><NavigateNextIcon /></div>
        </ListItemButton>
      </ListItem>
    )}
    </List>
  )
}