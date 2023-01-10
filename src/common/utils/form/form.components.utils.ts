import { FieldError } from 'react-hook-form'

export function convertToError(error?: string, fieldError?: FieldError): string | undefined {
  return error !== undefined ? error : fieldError?.message
}