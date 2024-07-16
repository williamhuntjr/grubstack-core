import React, { FC, useState } from 'react'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { BlockPicker } from 'react-color'
import { useDialog } from 'common/hooks/dialog.hook'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { getProperty } from 'app/restaurant/restaurant.utilities'
import { IRestaurantColors } from './restaurant-colors.types'
import { restaurantColors } from './restaurant-colors.constants'
import styles from './restaurant-colors.module.scss'

export const RestaurantColors: FC<IRestaurantColors> = ({ onUpdate, state }) => {
  const [color, setColor] = useState<string>('#111')

  const {
    open: colorPickerDialogOpen,
    closeDialog: closeColorPickerDialog,
    openDialog: openColorPickerDialog,
    data: colorPickerDialogData,
  } = useDialog<RestaurantProperty>()

  const handleChangeComplete = (value: { hex: React.SetStateAction<string> }): void => {
    setColor(value.hex)
  }

  const handleOpenDialog = (property: RestaurantProperty): void => {
    setColor(getProperty(state.properties, property) ?? '')
    openColorPickerDialog(property)
  }

  return (
    <div className={styles.restaurantColors}>
      <GrubDialog title={'Pick a Color'} open={colorPickerDialogOpen} onClose={closeColorPickerDialog}>
        <div>
          <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          <Button variant="contained" color="primary" onClick={() => onUpdate(colorPickerDialogData, color)}>
            Save
          </Button>
        </div>
      </GrubDialog>
      <h2>Colors</h2>
      <Divider />
      <div className={styles.colorsList}>
        {restaurantColors.map((restaurantColor, index) => (
          <div className={styles.colorContainer} key={index}>
            <h4>{restaurantColor.name}</h4>
            <p className={styles.subTitle}>{restaurantColor.description}</p>
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: getProperty(state.properties, restaurantColor.property) ?? '' }}
            />
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog(restaurantColor.property)}>
              Change Color
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
