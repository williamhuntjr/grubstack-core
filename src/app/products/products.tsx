import React, { useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPermissions } from 'common/auth/auth.constants'
import { validatePermissions } from 'common/auth/auth.utils'
import { productRoutePath } from './products.constants'

export const Products: FC = () => {
  const navigate = useNavigate()

  const init = (): void => {
    if (validatePermissions([UserPermissions.MaintainIngredients, UserPermissions.ViewIngredients])) {
      navigate(`${productRoutePath}/ingredients`)
      return
    }
    if (validatePermissions([UserPermissions.MaintainItems, UserPermissions.ViewItems])) {
      navigate(`${productRoutePath}/items`)
      return
    }
    if (validatePermissions([UserPermissions.MaintainMenus, UserPermissions.ViewMenus])) {
      navigate(`${productRoutePath}/menus`)
      return
    }
    if (validatePermissions([UserPermissions.MaintainVarieties, UserPermissions.ViewVarieties])) {
      navigate(`${productRoutePath}/varieties`)
      return
    }
  }

  // eslint-disable-next-line
  useEffect(() => init(), [])
  
  return (
    <></>
  )
}