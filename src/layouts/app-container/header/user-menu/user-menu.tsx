import React, { FC, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonIcon from '@mui/icons-material/Person'
import { HttpClient } from 'core/services/http-client'
import { IUser } from 'auth/auth.types'
import { appConfig } from 'common/config'
import styles from './user-menu.module.scss'

export const UserMenu: FC = () => {
  const [user, setUser] = useState<IUser>()
  const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('grubstackUser')
    await HttpClient.post('/auth/logout')
    window.location.href = `${appConfig.productionUrl}/sign-out`
  }

  const init = (): void => {
    const localStorageUser= localStorage.getItem('grubstackUser')
    if (localStorageUser != null) {
      setUser(JSON.parse(localStorageUser))
    }
  }

  useEffect(() => void init(), [])

  return (
    <div className={styles.userMenu}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 30, height: 30 }} className={styles.avatarContainer}><PersonIcon className={styles.avatarIcon} /></Avatar><p className={styles.avatarName}>{user?.first_name} {user?.last_name}</p>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        className={styles.headerMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small"/>
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  )
}