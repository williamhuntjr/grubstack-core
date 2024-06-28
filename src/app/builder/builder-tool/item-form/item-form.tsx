import React, { FC, useEffect } from 'react'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Divider } from '@mui/material'
import { DecimalField, FormCheckboxLabel } from 'common/utils/form/form.components'
import { convertMode } from 'common/utils/mode/mode.utils'
import { IBuilderItemFormValues, IItemForm } from './item-form.types'
import { defaultItemFormData, ItemFormField, ItemFormLabel } from './item-form.constants'
import styles from './item-form.module.scss'

export const ItemForm: FC<IItemForm> = ({ onSubmit, data, mode }) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm<IBuilderItemFormValues>({
    mode: 'onBlur',
    defaultValues: defaultItemFormData,
  })

  const { isViewMode } = convertMode(mode)

  const submitForm: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.stopPropagation() // To prevent submitting parent forms
    const eventHandler = handleSubmit(onSubmit)
    void eventHandler(e)
  }

  useEffect(() => {
    reset({
      price: data?.price,
      sale_price: data?.sale_price,
      is_onsale: data?.is_onsale,
    })
    // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.itemForm}>
      <div className={styles.formFieldGroup}>
        <DecimalField
          control={control}
          name={ItemFormField.Price}
          label={ItemFormLabel.Price}
          className={styles.formField}
          disabled={isViewMode}
        />
        <DecimalField
          control={control}
          name={ItemFormField.SalePrice}
          label={ItemFormLabel.SalePrice}
          className={styles.formField}
          disabled={isViewMode}
        />
      </div>
      <FormCheckboxLabel
        name={ItemFormField.OnSale}
        label={ItemFormLabel.OnSale}
        control={control}
        disabled={isViewMode}
        className={styles.onSaleCheckbox}
      />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty}>
        Save Item
      </Button>
    </form>
  )
}
