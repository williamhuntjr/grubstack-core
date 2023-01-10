import { IPaginationParams } from 'common/common.types'

export function prepareRequestParams<TFilters extends { [T in keyof TFilters]: TFilters[T] }>(
  paginationParams: IPaginationParams
): Partial<IPaginationParams> {
  
  const { limit, page } = paginationParams
  return { limit, page: page !== 0 ? page : 1 }
}