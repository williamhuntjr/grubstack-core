import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertMode } from 'common/utils/mode/mode.utils'
import { FormField } from 'common/utils/form/form.components'
import { IItemForm, ItemFormField, ItemFormLabel, IItemFormValues } from './item-form.types'
import { ItemFormSchema } from './item-form.validation'
import { defaultItemFormData } from './item-form.constants'
import styles from './item-form.module.scss'

export const ItemForm: FC<IItemForm> = memo(({ onSubmit, mode, data }) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
    formState: { isDirty }
  } = useForm<IItemFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(ItemFormSchema),
    defaultValues: defaultItemFormData,
  })

  const { isViewMode } = convertMode(mode)

  const submitForm: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.stopPropagation() // To prevent submitting parent forms
    const eventHandler = handleSubmit(onSubmit)
    void eventHandler(e)
  }

  useEffect(() => {
    if (data) { void reset(data) }
    // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.itemForm}>
      <FormField
        name={ItemFormField.Name}
        control={control}
        label={ItemFormLabel.Name}
        className={styles.formField}
        disabled={isViewMode}
      />
      <FormField
        name={ItemFormField.Description}
        control={control}
        label={ItemFormLabel.Description}
        className={styles.formField}
        disabled={isViewMode}
      />
      <FormField
        name={ItemFormField.Thumbnail}
        control={control}
        label={ItemFormLabel.Thumbnail}
        className={styles.formField}
        disabled={isViewMode}
      />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" disabled={!isDirty} className={styles.saveButton}>
        Save Item
      </Button>
    </form>
  )
})