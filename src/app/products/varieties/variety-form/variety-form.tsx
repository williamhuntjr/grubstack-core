import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertMode } from 'common/utils/mode/mode.utils'
import { cls } from 'common/utils/utils'
import { FormField } from 'common/utils/form/form.components'
import { IVarietyForm, VarietyFormField, VarietyFormLabel, IVarietyFormValues } from './variety-form.types'
import { VarietyFormSchema } from './variety-form.validation'
import { defaultVarietyFormData } from './variety-form.constants'
import styles from './variety-form.module.scss'

export const VarietyForm: FC<IVarietyForm> = memo(({ 
    onSubmit, 
    mode, 
    data,
    isPickerDirty,
    onOpenFilePicker,
}) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
    getValues,
    formState: { isDirty }
  } = useForm<IVarietyFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(VarietyFormSchema),
    defaultValues: defaultVarietyFormData,
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
    <form onSubmit={submitForm} className={styles.varietyForm}>
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
            name={VarietyFormField.Name}
            control={control}
            label={VarietyFormLabel.Name}
            className={styles.formField}
            disabled={isViewMode}
          />
          <FormField
            name={VarietyFormField.Description}
            control={control}
            label={VarietyFormLabel.Description}
            className={styles.formField}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={VarietyFormField.Thumbnail}
        control={control}
        label={VarietyFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" disabled={!isDirty && !isPickerDirty} className={styles.saveButton}>
        Save Variety
      </Button>
    </form>
  )
})