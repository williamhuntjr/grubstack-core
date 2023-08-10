import React, { FC, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { GrubList } from 'core/components/grub-list/grub-list'
import { FormField, FormSelectField } from 'common/utils/form/form.components'
import { cls } from 'common/utils/utils'
import { defineFormSelectData } from 'core/components/select-field/select-field.utils'
import { convertMode } from 'common/utils/mode/mode.utils'
import { hasPermission } from 'common/auth/auth.utils'
import { UserPermissions } from 'common/auth/auth.constants'
import { StoreFormField, StoreFormLabel, IStoreForm, IStoreFormValues } from './store-form.types'
import { StoreFormSchema } from './store-form.validation'
import { storeTypes, defaultStoreFormData } from './store-form.constants'
import { normalizeMenuData } from './store-form.utils'
import styles from './store-form.module.scss'

export const StoreForm: FC<IStoreForm> = memo(({ 
  onSubmit,
  onDeleteMenu,
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
  } = useForm<IStoreFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(StoreFormSchema),
    defaultValues: defaultStoreFormData,
  })

  const canEditStores = hasPermission(UserPermissions.MaintainStores)

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
    onDeleteMenu(data?.id ?? '', value)
  }

  useEffect(() => {
    if (data) { void reset(data) }
    // eslint-disable-next-line
  }, [data])

  return (
    <form onSubmit={submitForm} className={styles.storeForm}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnail}>
          <img src={data?.thumbnail_url || '/assets/img/placeholder-image.jpg'} alt={data?.name} />
          <Button variant="contained" color="secondary" onClick={() => onOpenFilePicker(getValues())}>Change Image</Button>
        </div>
        <div className={styles.headerInput}>
          <FormField
            name={StoreFormField.Name}
            control={control}
            label={StoreFormLabel.Name}
            className={styles.storeName}
            disabled={isViewMode}
          />
          <FormSelectField
            control={control}
            name={StoreFormField.StoreType}
            label={StoreFormLabel.StoreType}
            disabled={isViewMode}
            options={defineFormSelectData(storeTypes)}
            className={styles.storeType}
          />
        </div>
      </div>
      <FormField
        name={StoreFormField.Address}
        control={control}
        label={StoreFormLabel.Address}
        className={cls(styles.formField, styles.storeAddress)}
        disabled={isViewMode}
      />
      <div className={styles.addressDetails}>
        <div className={styles.addressInputContainer}>
          <FormField
            name={StoreFormField.City}
            control={control}
            label={StoreFormLabel.City}
            className={cls(styles.formField, styles.storeCity)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={StoreFormField.State}
            control={control}
            label={StoreFormLabel.State}
            className={cls(styles.formField, styles.storeState)}
            disabled={isViewMode}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <FormField
            name={StoreFormField.Postal}
            control={control}
            label={StoreFormLabel.Postal}
            className={cls(styles.formField, styles.storePostal)}
            disabled={isViewMode}
          />
        </div>
      </div>
      <FormField
        name={StoreFormField.Thumbnail}
        control={control}
        label={StoreFormLabel.Thumbnail}
        className={cls(styles.formField, styles.thumbnailUrl)}
        disabled={isViewMode}
      />
      <GrubList data={normalizeMenuData(data?.menus ?? [])} disabled={!canEditStores || isNewMode} subHeader="Food Menus" onClickAdd={handleOpenAddDialog} className={styles.storeFormMenuList} onClickDelete={handleDelete} />
      <Divider className={styles.divider} />
      <Button type="submit" variant="contained" color="primary" className={styles.saveButton} disabled={!isDirty && !isPickerDirty}>
        Save Store
      </Button>
    </form>
  )
})
