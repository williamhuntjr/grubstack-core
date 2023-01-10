import { IServerError } from './core.types'
import { IResponse } from 'common/common.types'

export function isHttpError(error: unknown): error is IServerError {
  return typeof error === 'object' && error !== null && 'response' in error
}

export function isEmptyResponse<T extends {}>(response: IResponse<T>): boolean {
  return !Object.keys(response.data).length
}
