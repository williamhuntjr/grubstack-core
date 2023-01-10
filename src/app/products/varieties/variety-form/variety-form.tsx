import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertMode } from 'common/utils/mode/mode.utils'
import { FormField } from 'common/utils/form/form.components'
import { IVarietyForm, VarietyFormField, VarietyFormLabel, IVarietyFormValues } from './variety-form.types'
import { VarietyFormSchema } from './variety-form.validation'
import { defaultVarietyFormData } from './variety-form.constants'
import styles from './variety-form.module.scss'

export const VarietyForm: FC<IVarietyForm> = memo(({ onSubmit, mode, data }) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
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
      <FormField
        name={VarietyFormField.Thumbnail}
        control={control}
        label={VarietyFormLabel.Thumbnail}
        className={styles.formField}
        disabled={isViewMode}
      />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" disabled={!isDirty} className={styles.saveButton}>
        Save Variety
      </Button>
    </form>
  )
})