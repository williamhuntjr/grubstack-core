import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { FormCheckboxLabel, FormField, FormSelectField } from 'common/utils/form/form.components'
import { cls } from 'common/utils/utils'
import { defineFormSelectData } from 'core/components/select-field/select-field.utils'
import { convertMode } from 'common/utils/mode/mode.utils'
import { GSMode } from 'common/utils/mode/mode.types'
import { LocationFormField, LocationFormLabel, ILocationForm, ILocationFormValues } from './location-form.types'
import { LocationFormSchema } from './location-form.validation'
import { locationTypes, defaultLocationFormData } from './location-form.constants'
import styles from './location-form.module.scss'

export const LocationForm: FC<ILocationForm> = memo(({ 
  onSubmit,
  mode,
  data
}) => {
  const { 
    handleSubmit, 
    control, 
    reset,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm<ILocationFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(LocationFormSchema),
    defaultValues: defaultLocationFormData,
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
    <form onSubmit={submitForm} className={styles.locationForm}>
      <div className={styles.headerInput}>
        <div className={styles.headerInputContainer}>
          <FormField
            name={LocationFormField.Name}
            control={control}
            label={LocationFormLabel.Name}
            className={styles.locationName}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.headerInputContainer}>
          <FormSelectField
            control={control}
            name={LocationFormField.LocationType}
            label={LocationFormLabel.LocationType}
            disabled={isViewMode}
            options={defineFormSelectData(locationTypes)}
            className={styles.locationType}
          />
        </div>
        <div className={styles.headerInputContainer}>
          <FormField
            name={LocationFormField.PhoneNumber}
            control={control}
            label={LocationFormLabel.PhoneNumber}
            className={styles.phoneNumber}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={LocationFormField.Address}
        control={control}
        label={LocationFormLabel.Address}
        className={cls(styles.formField, styles.locationAddress)}
        disabled={isViewMode}
      />
      <div className={styles.addressDetails}>
        <div className={styles.addressInputContainer}>
          <FormField
            name={LocationFormField.City}
            control={control}
            label={LocationFormLabel.City}
            className={cls(styles.formField, styles.locationCity)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={LocationFormField.State}
            control={control}
            label={LocationFormLabel.State}
            className={cls(styles.formField, styles.locationState)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={LocationFormField.Postal}
            control={control}
            label={LocationFormLabel.Postal}
            className={cls(styles.formField, styles.locationPostal)}
            disabled={isViewMode}
          />
        </div>
      </div>
      {mode == GSMode.Edit &&
      <div>
        <FormCheckboxLabel
          control={control}
          name={LocationFormField.IsActive}
          label={LocationFormLabel.IsActive}
          className={styles.isActiveCheckbox}
        />
        <Switch aria-label='Switch demo' checked={getValues(LocationFormField.IsActive)} onChange={(e) => setValue(LocationFormField.IsActive, e.target.checked, { shouldDirty: true })}/> Enabled
      </div>
      }
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty}>
        Save Location
      </Button>
    </form>
  )
})
