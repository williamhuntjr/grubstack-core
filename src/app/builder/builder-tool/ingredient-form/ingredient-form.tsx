import React, { FC, memo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import { FormCheckboxLabel } from 'common/utils/form/form.components'
import { convertMode } from 'common/utils/mode/mode.utils'
import { defaultIngredientFormData, IngredientFormField, IngredientFormLabel } from './ingredient-form.constants'
import { IIngredientForm, IBuilderIngredientFormValues } from './ingredient-form.types'
import styles from './ingredient-form.module.scss'

export const IngredientForm: FC<IIngredientForm> = memo(({ onSubmit, data, mode }) => {
  const { 
    handleSubmit, 
    control,
    reset,
    formState: { isDirty },
    watch,
    setValue
  } = useForm<IBuilderIngredientFormValues>({
    mode: 'onBlur',
    defaultValues: defaultIngredientFormData,
  })

  const { isViewMode } = convertMode(mode)

  const submitForm: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.stopPropagation() // To prevent submitting parent forms
    const eventHandler = handleSubmit(onSubmit)
    void eventHandler(e)
  }

  const handleOptionalCheckbox = useCallback((checked: boolean): void => {
    if (!checked) {
      setValue(IngredientFormField.Addon, false)
    }
  }, [setValue])

  const handleAddonCheckbox = useCallback((): void => {
    setValue(IngredientFormField.Extra, false)
  }, [setValue])

  useEffect(() => {
    reset({
      is_optional: data?.is_optional,
      is_addon: data?.is_addon,
      is_extra: data?.is_extra,
    })
  // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.ingredientForm}>
      <FormCheckboxLabel
        name={IngredientFormField.Optional}
        label={IngredientFormLabel.Optional}
        control={control}
        className={styles.formCheckbox}
        onChange={(value) => handleOptionalCheckbox(value)}
        disabled={isViewMode}
      />
      <FormCheckboxLabel
        name={IngredientFormField.Extra}
        label={IngredientFormLabel.Extra}
        control={control}
        className={styles.formCheckbox}
        disabled={watch(IngredientFormField.Addon, false) || isViewMode}
      />
      <FormCheckboxLabel
        name={IngredientFormField.Addon}
        label={IngredientFormLabel.Addon}
        control={control}
        className={styles.formCheckbox}
        disabled={!watch(IngredientFormField.Optional, false) || isViewMode }
        onChange={() => handleAddonCheckbox()}
      />
      <Divider className={styles.divider}/>
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty}>
        Save Ingredient
      </Button>
    </form>
  )
})