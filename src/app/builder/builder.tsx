import React, { FC, useState } from 'react'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CategoryIcon from '@mui/icons-material/Category'
import { useNavigate } from 'react-router-dom'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { useDialog } from 'common/hooks/dialog.hook'
import { CardButton } from 'common/components/card-button/card-button'
import { IItem } from 'app/products/items/items.types'
import { IMenu } from 'app/products/menus/menus.types'
import { UserPermissions } from 'auth/auth.constants'
import { validatePermissions } from 'auth/auth.utils'
import { BuilderTypes, builderRoutePath } from './builder.constants'
import { BuilderDialog } from './builder-dialog/builder-dialog'
import styles from './builder.module.scss'

export const Builder: FC = () => {
  const [builderType, setBuilderType] = useState(BuilderTypes.Item)

  let navigate = useNavigate()

  const { open: builderDialogOpen, openDialog: openBuilderDialog, closeDialog: closeBuilderDialog } = useDialog<null>()

  const handleClick = (data: IItem | IMenu): void => {
    if (builderType === BuilderTypes.Item) {
      navigate(`${builderRoutePath}/item/${data.id}`)
      return
    }
    if (builderType === BuilderTypes.Variety) {
      navigate(`${builderRoutePath}/variety/${data.id}`)
      return
    }
    if (builderType === BuilderTypes.Menu) {
      navigate(`${builderRoutePath}/menu/${data.id}`)
      return
    }
  }

  return (
    <div className={styles.builderContainer}>
      <GrubDialog open={builderDialogOpen} onClose={closeBuilderDialog} title={`${builderType} Picker`}>
        <BuilderDialog builderType={builderType} onClose={closeBuilderDialog} onClick={handleClick} />
      </GrubDialog>
      <div className={styles.cardContainer}>
        {validatePermissions([UserPermissions.MaintainItems]) && (
          <div className={styles.cardButtonContainer}>
            <CardButton
              title="Build an Item"
              description="Add ingredients to an item"
              onClick={() => {
                setBuilderType(BuilderTypes.Item)
                openBuilderDialog(null)
              }}
              icon={<LunchDiningIcon />}
              responsive={true}
            />
          </div>
        )}
        {validatePermissions([UserPermissions.MaintainItems]) && (
          <div className={styles.cardButtonContainer}>
            <CardButton
              title="Build a Variety"
              description="Add varieties to your item"
              onClick={() => {
                setBuilderType(BuilderTypes.Variety)
                openBuilderDialog(null)
              }}
              icon={<CategoryIcon />}
              responsive={true}
            />
          </div>
        )}
        {validatePermissions([UserPermissions.MaintainMenus]) && (
          <div className={styles.cardButtonContainer}>
            <CardButton
              title="Build a Menu"
              description="Add items to your menu"
              onClick={() => {
                setBuilderType(BuilderTypes.Menu)
                openBuilderDialog(null)
              }}
              icon={<MenuBookIcon />}
              responsive={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}
