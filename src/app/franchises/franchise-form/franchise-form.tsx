import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { GrubList } from 'core/components/grub-list/grub-list'
import { FormField } from 'common/utils/form/form.components'
import { cls } from 'common/utils/utils'
import { convertMode } from 'common/utils/mode/mode.utils'
import { hasPermission } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { FranchiseFormField, FranchiseFormLabel, IFranchiseForm, IFranchiseFormValues } from './franchise-form.types'
import { FranchiseFormSchema } from './franchise-form.validation'
import { defaultFranchiseFormData } from './franchise-form.constants'
import { normalizeStoreData } from './franchise-form.utils'
import styles from './franchise-form.module.scss'

export const FranchiseForm: FC<IFranchiseForm> = memo(({ 
  onSubmit,
  onDeleteStore,
  mode,
  data,
  onOpenAddDialog,
  onOpenFilePicker,
  isPickerDirty,
}) => {
  const { 
    handleSubmit, 
    control, 
    reset, 
    getValues,
    formState: { isDirty },
  } = useForm<IFranchiseFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(FranchiseFormSchema),
    defaultValues: defaultFranchiseFormData,
  })

  const canEditFranchises = hasPermission(UserPermissions.MaintainFranchises)

  const { isViewMode, isNewMode } = convertMode(mode)

  const submitForm: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.stopPropagation() // To prevent submitting parent forms
    const eventHandler = handleSubmit(onSubmit)
    void eventHandler(e)
  }

  const handleOpenAddDialog = (): void => {
    onOpenAddDialog([])
  }

  const handleDelete = (value: string): void => {
    onDeleteStore(data?.id ?? '', value)
  }

  useEffect(() => {
    if (data) { void reset(data) }
    // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.franchiseForm}>
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
            name={FranchiseFormField.Name}
            control={control}
            label={FranchiseFormLabel.Name}
            className={styles.franchiseName}
            disabled={isViewMode}
          />
          <FormField
            name={FranchiseFormField.Description}
            control={control}
            label={FranchiseFormLabel.Description}
            className={styles.description}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={FranchiseFormField.Thumbnail}
        control={control}
        label={FranchiseFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <GrubList data={normalizeStoreData(data?.stores ?? [])} disabled={!canEditFranchises || isNewMode} subHeader="Franchise Stores" onClickAdd={handleOpenAddDialog} className={styles.franchiseFormStoreList} onClickDelete={handleDelete} />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty && !isPickerDirty}>
        Save Franchise
      </Button>
    </form>
  )
})
