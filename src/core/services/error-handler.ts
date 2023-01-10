import { toast } from 'react-toastify'
import { IResponseStatus } from 'common/common.types'

export interface IErrorWithWithStatus extends Error {
  response: { data: { status: IResponseStatus } }
}

function isErrorWithWithStatus(error: object): error is IErrorWithWithStatus {
  return 'response' in error
}

function statusErrorHasMessage(error: IErrorWithWithStatus): boolean {
  return Boolean(error?.response?.data?.status?.message)
}

function retriveStatusError(error: IErrorWithWithStatus): string {
  return error.response.data.status.message
}

export interface IErrorHandler {
  handleError(error: Error | IErrorWithWithStatus, id?: string): void
}

export class ErrorHandler implements IErrorHandler {
  public handleError(error: Error | IErrorWithWithStatus): void {
    let errorMessage: string = error.message
    if (isErrorWithWithStatus(error) && statusErrorHasMessage(error)) {
      errorMessage = retriveStatusError(error)
    }
    toast.error(`${errorMessage}.`)
  }
}
