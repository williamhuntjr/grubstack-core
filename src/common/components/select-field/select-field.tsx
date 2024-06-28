import React, { useRef } from 'react'
import { nanoid } from 'nanoid'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { cls } from 'common/utils/utils'
import styles from './select-field.module.scss'

export interface ISelectProps<TValue> {
  label: string
  value?: TValue | null
  disabled?: boolean
  className?: string
  error?: string
  hidden?: boolean
  onBlur?(): void
  multiple?: boolean
  clearable?: boolean
  options: React.ReactNode[]
  onChange?(value: TValue | null): void
}

export function SelectField<TValue>({
  label,
  value,
  disabled,
  options,
  onChange,
  className,
  error,
  hidden,
  onBlur,
  multiple,
}: ISelectProps<TValue>): React.ReactElement {
  const componentIdRef = useRef<string>(nanoid())
  const id = componentIdRef.current

  return (
    <FormControl
      hidden={hidden}
      className={cls('MuiFormField', 'MuiFormFieldSelect', className, value ? 'MufFormSelectFilled' : 'MufFormSelectEmpty')}
      variant="outlined"
      error={!!error}
    >
      <div>
        <div>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            labelId={id}
            value={value}
            title={Array.isArray(value) ? value.join(', ') : ''}
            onBlur={onBlur}
            onChange={(e) => onChange && onChange(e.target.value as TValue)}
            disabled={disabled}
            label={label}
            multiple={multiple}
            className={styles.selectField}
          >
            {options}
          </Select>
        </div>
        <FormHelperText hidden={!error}>{error}</FormHelperText>
      </div>
    </FormControl>
  )
}
