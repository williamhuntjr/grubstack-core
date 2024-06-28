import { IPaginationParams } from 'common/types'
import { checkAndCreateFiltersObject } from 'common/utils/filter.utils'

export function prepareRequestParams<TFilters extends { [T in keyof TFilters]: TFilters[T] }>(
  paginationParams?: IPaginationParams,
  filters?: TFilters
): Partial<TFilters> & Partial<IPaginationParams> {
  const filtersObject = checkAndCreateFiltersObject(filters)

  if (paginationParams) {
    const { limit, page } = paginationParams
    return { limit, page: page !== 0 ? page : 1, ...filtersObject }
  }
  return { ...filtersObject }
}
