import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import Divider from '@mui/material/Divider'
import { FormField, DecimalField } from 'common/utils/form/form.components'
import { cls } from 'common/utils/utils'
import { convertMode } from 'common/utils/mode/mode.utils'
import { defaultIngredientFormData } from './ingredient-form.constants'
import { IngredientFormField, IngredientFormLabel, IIngredientForm, IIngredientFormValues } from './ingredient-form.types'
import { IngredientFormSchema } from './ingredient-form.validation'
import styles from './ingredient-form.module.scss'

export const IngredientForm: FC<IIngredientForm> = memo(({ onSubmit, mode, data, onOpenFilePicker, isPickerDirty }) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isDirty },
  } = useForm<IIngredientFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(IngredientFormSchema),
    defaultValues: defaultIngredientFormData,
  })

  const { isViewMode } = convertMode(mode)

  const submitForm: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.stopPropagation() // To prevent submitting parent forms
    const eventHandler = handleSubmit(onSubmit)
    void eventHandler(e)
  }

  useEffect(() => {
    if (data) {
      void reset(data)
    }
    // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.ingredientForm}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
          <img src={data?.thumbnail_url || '/assets/img/placeholder-image.jpg'} alt={data?.name} />
          <Button variant="contained" color="secondary" onClick={() => onOpenFilePicker(getValues())} disabled={isViewMode}>
            Change Image
          </Button>
        </div>
        <div className={styles.headerInput}>
          <FormField
            name={IngredientFormField.Name}
            control={control}
            label={IngredientFormLabel.Name}
            className={styles.ingredientName}
            disabled={isViewMode}
          />
          <FormField
            name={IngredientFormField.Description}
            control={control}
            label={IngredientFormLabel.Description}
            className={cls(styles.formField, styles.ingredientDescription)}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={IngredientFormField.Thumbnail}
        control={control}
        label={IngredientFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <div className={styles.decimalFields}>
        <DecimalField
          name={IngredientFormField.Calories}
          control={control}
          label={IngredientFormLabel.Calories}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Fat}
          control={control}
          label={IngredientFormLabel.Fat}
          className={styles.decimalField}
          disabled={isViewMode}
        />
        <DecimalField
          name={IngredientFormField.SaturatedFat}
          control={control}
          label={IngredientFormLabel.SaturatedFat}
          disabled={isViewMode}
          className={styles.decimalField}
        />
      </div>
      <div className={styles.decimalFields}>
        <DecimalField
          name={IngredientFormField.TransFat}
          control={control}
          label={IngredientFormLabel.TransFat}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Cholesterol}
          control={control}
          label={IngredientFormLabel.Cholesterol}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Sodium}
          control={control}
          label={IngredientFormLabel.Sodium}
          disabled={isViewMode}
          className={styles.decimalField}
        />
      </div>
      <div className={styles.decimalFields}>
        <DecimalField
          name={IngredientFormField.Carbs}
          control={control}
          label={IngredientFormLabel.Carbs}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Protein}
          control={control}
          label={IngredientFormLabel.Protein}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Sugar}
          control={control}
          label={IngredientFormLabel.Sugar}
          disabled={isViewMode}
          className={styles.decimalField}
        />
      </div>
      <div className={styles.decimalFields}>
        <DecimalField
          name={IngredientFormField.Fiber}
          control={control}
          label={IngredientFormLabel.Fiber}
          disabled={isViewMode}
          className={styles.decimalField}
        />
        <DecimalField
          name={IngredientFormField.Price}
          control={control}
          label={IngredientFormLabel.Price}
          disabled={isViewMode}
          className={styles.lastField}
        />
      </div>

      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="secondary" className={styles.saveButton} disabled={!isDirty && !isPickerDirty}>
        Save
      </Button>
    </form>
  )
})
