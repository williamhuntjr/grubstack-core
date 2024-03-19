import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertMode } from 'common/utils/mode/mode.utils'
import { FormField, FormSelectField } from 'common/utils/form/form.components'
import { cls } from 'common/utils/utils'
import { labelColorOptions } from 'common/constants'
import { defineFormSelectData } from 'core/components/select-field/select-field.utils'
import { IItemForm, ItemFormField, ItemFormLabel, IItemFormValues } from './item-form.types'
import { ItemFormSchema } from './item-form.validation'
import { defaultItemFormData } from './item-form.constants'
import styles from './item-form.module.scss'

export const ItemForm: FC<IItemForm> = memo(({ 
  onSubmit, 
  mode, 
  data, 
  onOpenFilePicker, 
  isPickerDirty 
}) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
    formState: { isDirty },
    getValues,
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
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
          <img src={data?.thumbnail_url || '/assets/img/placeholder-image.jpg'} alt={data?.name} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onOpenFilePicker(getValues())}
            disabled={isViewMode}
          >
            Change Image
          </Button>
        </div>
        <div className={styles.headerInput}>
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
          <FormSelectField
            name={ItemFormField.LabelColor}
            control={control}
            label={ItemFormLabel.LabelColor}
            options={defineFormSelectData(labelColorOptions)}
            className={styles.formField}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={ItemFormField.Thumbnail}
        control={control}
        label={ItemFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" disabled={!isDirty && !isPickerDirty} className={styles.saveButton}>
        Save Item
      </Button>
    </form>
  )
})