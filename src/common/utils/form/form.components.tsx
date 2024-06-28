import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { SelectField } from 'common/components/select-field/select-field'
import { IFormField, IDecimalField, IFormCheckboxLabel, IFormSelectField } from './form.components.types'
import { convertToError } from './form.components.utils'

export function FormField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
  className,
  hidden = false,
  type,
  inputProps,
  onChange,
  error,
}: IFormField<TFieldValues>): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange: onControlChange, onBlur: onControlBlur },
        fieldState: { error: fieldError, isTouched },
        formState: { isSubmitted },
      }) => {
        const controlError = isSubmitted || isTouched ? convertToError(error, fieldError) : undefined

        return (
          <TextField
            inputProps={inputProps}
            type={type}
            className={className}
            label={label}
            value={value ? String(value) : ''}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value)
              }
              onControlChange(e.target.value)
            }}
            disabled={disabled}
            hidden={hidden}
            error={!!controlError}
            helperText={controlError}
            onBlur={() => onControlBlur()}
          />
        )
      }}
    />
  )
}

export function DecimalField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
  className,
  hidden = false,
  onChange,
  error,
}: IDecimalField<TFieldValues>): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange: onControlChange, onBlur: onControlBlur },
        fieldState: { error: fieldError, isTouched },
        formState: { isSubmitted },
      }) => {
        const controlError = isSubmitted || isTouched ? convertToError(error, fieldError) : undefined

        return (
          <TextField
            inputProps={{ inputMode: 'numeric', step: 0.1 }}
            className={className}
            label={label}
            value={value ?? ''}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value)
              }
              onControlChange(e.target.value)
            }}
            type="number"
            disabled={disabled}
            hidden={hidden}
            error={!!controlError}
            helperText={controlError}
            onBlur={() => onControlBlur()}
          />
        )
      }}
    />
  )
}

export function FormCheckboxLabel<TFieldValue extends FieldValues>({
  label,
  disabled,
  name,
  control,
  onChange,
  className,
  hidden,
}: IFormCheckboxLabel<TFieldValue>): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange: onControlChange } }) => (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              disabled={disabled}
              onChange={({ target: { checked: targetChecked } }) => {
                if (onChange) {
                  onChange(targetChecked)
                }
                onControlChange(targetChecked)
              }}
            />
          }
          value={Boolean(value)}
          checked={Boolean(value)}
          className={className}
          label={label}
          hidden={hidden}
          disabled={disabled}
        />
      )}
    />
  )
}

export function FormSelectField<TFieldValue extends FieldValues>({
  name,
  control,
  label,
  disabled,
  options,
  onChange,
  className,
  error,
  hidden,
  multiple,
  clearable,
}: IFormSelectField<TFieldValue>): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange: onControlChange },
        fieldState: { error: fieldError, isTouched },
        formState: { isSubmitted },
      }) => {
        const controlError = isSubmitted || isTouched ? convertToError(error, fieldError) : undefined

        return (
          <SelectField
            value={value}
            error={controlError}
            clearable={clearable}
            hidden={hidden}
            className={className}
            onChange={onChange ?? onControlChange}
            disabled={disabled}
            label={label}
            multiple={multiple}
            options={options}
          />
        )
      }}
    />
  )
}
