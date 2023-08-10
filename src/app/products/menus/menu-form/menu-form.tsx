import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { cls } from 'common/utils/utils'
import { FormField } from 'common/utils/form/form.components'
import { convertMode } from 'common/utils/mode/mode.utils'
import { defaultMenuFormData } from './menu-form.constants'
import { MenuFormField, MenuFormLabel, IMenuForm, IMenuFormValues } from './menu-form.types'
import { MenuFormSchema } from './menu-form.validation'
import styles from './menu-form.module.scss'

export const MenuForm: FC<IMenuForm> = memo(({ 
  onSubmit, 
  mode, 
  data,
  onOpenFilePicker,
  isPickerDirty,
}) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
    formState: { isDirty } 
  } = useForm<IMenuFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(MenuFormSchema),
    defaultValues: defaultMenuFormData,
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
    <form onSubmit={submitForm} className={styles.menuForm}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
          <img src={data?.thumbnail_url || '/assets/img/placeholder-image.jpg'} alt={data?.name} />
          <Button variant="contained" color="secondary" onClick={() => onOpenFilePicker(null)}>Change Image</Button>
        </div>
        <div className={styles.headerInput}>
          <FormField
            name={MenuFormField.Name}
            control={control}
            label={MenuFormLabel.Name}
            className={styles.formField}
            disabled={isViewMode}
          />
          <FormField
            name={MenuFormField.Description}
            control={control}
            label={MenuFormLabel.Description}
            className={styles.formField}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={MenuFormField.Thumbnail}
        control={control}
        label={MenuFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <Divider className={styles.divider}/>
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty && !isPickerDirty}>
        Save Menu
      </Button>
    </form>
  )
})