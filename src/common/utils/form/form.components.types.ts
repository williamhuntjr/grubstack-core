import { Control, FieldValues } from 'react-hook-form'
import { FieldPath, FieldPathValue } from 'react-hook-form/dist/types'
import { OutlinedInputProps } from '@mui/material'

export interface IBaseProps {
  label: string
  disabled?: boolean
  className?: string
  error?: string
  hidden?: boolean
}

export interface IBaseControllerProps<TFieldValues extends FieldValues> extends IBaseProps {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
}

export interface IFormField<TFieldValues extends FieldValues> extends IBaseControllerProps<TFieldValues> {
  onChange?: (value: string) => void
  type?: React.InputHTMLAttributes<unknown>['type']
  inputProps?: OutlinedInputProps['inputProps']
}

export interface IDecimalField<TFieldValues extends FieldValues> extends IBaseControllerProps<TFieldValues> {
  onChange?: (value: string) => void
  type?: React.InputHTMLAttributes<unknown>['type']
  inputProps?: OutlinedInputProps['inputProps']
}

export interface IFormCheckboxLabel<TFieldValues extends FieldValues> extends IBaseControllerProps<TFieldValues> {
  onChange?(checked: boolean): void
}

export interface IFormSelectField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
  extends IBaseControllerProps<TFieldValues> {
  multiple?: boolean
  clearable?: boolean
  options: React.ReactNode[]
  onChange?(value: FieldPathValue<TFieldValues, TName>): void
}