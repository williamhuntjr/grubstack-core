import React, { FC, memo, useEffect } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { cls } from 'common/utils/utils'
import { convertMode } from 'common/utils/mode/mode.utils'
import { FormField, FormSelectField } from 'common/utils/form/form.components'
import { defineFormSelectData } from 'common/components/select-field/select-field.utils'
import { 
  EmployeeFormField, 
  EmployeeFormLabel,
  IEmployeeFormValues,
  IEmployeeForm
} from './employee-form.types'
import { EmployeeFormSchema } from './employee-form.validation'
import { defaultEmployeeFormData, genderTypes, jobTitles, employmentStatusList } from './employee-form.constants'
import styles from './employee-form.module.scss'

export const EmployeeForm: FC<IEmployeeForm> = memo(({ 
  onSubmit, 
  mode, 
  data, 
  onOpenFilePicker,
  isPickerDirty,
}) => {
  const { 
    control, 
    reset,
    handleSubmit,
    formState: { isDirty },
    getValues
  } = useForm<IEmployeeFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(EmployeeFormSchema),
    defaultValues: defaultEmployeeFormData,
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
    <form onSubmit={submitForm} className={styles.employeeForm}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
        <img src={data?.profile_thumbnail_url || '/assets/img/placeholder-image.jpg'} alt={data?.first_name} />
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
            control={control}
            name={EmployeeFormField.FirstName}
            label={EmployeeFormLabel.FirstName}
            className={styles.firstName}
            disabled={isViewMode}
          />
          <FormField
            control={control}
            name={EmployeeFormField.LastName}
            label={EmployeeFormLabel.LastName}
            className={styles.lastName}
            disabled={isViewMode}
          />
          <FormSelectField
            control={control}
            name={EmployeeFormField.Gender}
            label={EmployeeFormLabel.Gender}
            options={defineFormSelectData(genderTypes)}
            className={styles.gender}
            disabled={isViewMode}
          />
        </div>
      </div>
      <div className={styles.jobInfo}>
        <div className={styles.jobInfoInputContainer}>
          <FormSelectField
            control={control}
            name={EmployeeFormField.JobTitle}
            label={EmployeeFormLabel.JobTitle}
            options={defineFormSelectData(jobTitles)}
            className={styles.jobTitle}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.jobInfoInputContainer}>
          <FormField
            control={control}
            name={EmployeeFormField.HireDate}
            label={EmployeeFormLabel.HireDate}
            className={styles.hireDate}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.jobInfoInputContainer}>
          <FormSelectField
            control={control}
            name={EmployeeFormField.EmploymentStatus}
            label={EmployeeFormLabel.EmploymentStatus}
            options={defineFormSelectData(employmentStatusList)}
            className={styles.employmentStatus}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={EmployeeFormField.Address}
        control={control}
        label={EmployeeFormLabel.Address}
        className={styles.employeeAddress}
        disabled={isViewMode}
      />
      <div className={styles.addressDetails}>
        <div className={styles.addressInputContainer}>
          <FormField
            name={EmployeeFormField.City}
            control={control}
            label={EmployeeFormLabel.City}
            className={cls(styles.formField, styles.employeeCity)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={EmployeeFormField.State}
            control={control}
            label={EmployeeFormLabel.State}
            className={cls(styles.formField, styles.employeeState)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={EmployeeFormField.Postal}
            control={control}
            label={EmployeeFormLabel.Postal}
            className={cls(styles.formField, styles.employeePostal)}
            disabled={isViewMode}
          />
        </div>
      </div>
      <div className={styles.contactInfo}>
        <div className={styles.contactInputContainer}>
          <FormField
            name={EmployeeFormField.Phone}
            control={control}
            label={EmployeeFormLabel.Phone}
            className={styles.phoneNumber}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.contactInputContainer}>
          <FormField
            name={EmployeeFormField.Email}
            control={control}
            label={EmployeeFormLabel.Email}
            className={styles.emailAddress}
            disabled={isViewMode}
          />
        </div>
      </div>
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" disabled={!isDirty && !isPickerDirty} className={styles.saveButton}>
        Save Employee
      </Button>
    </form>
  )
})