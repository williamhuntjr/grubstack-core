import { useCallback, useEffect, useState } from 'react'
import { IPaginationData, IPaginationParams } from 'common/types'
import { listPageSize } from 'common/constants'

export interface IPaginationHookState<TData> {
  isLoading: boolean
  pagination: IPaginationParams
  data: TData[]
  total: number
  pages: number
}

export interface IPaginationHook<TData> {
  pagination: ITablePagination
  state: IPaginationHookState<TData>
  refresh(): Promise<void>
}

type TPaginationRequestFn<TData, TFilters> = (
  pagination: IPaginationParams,
  filters?: TFilters,
  data?: TData[]
) => Promise<IPaginationData<TData>>

export interface ITablePagination {
  total: number
  limit: number
  page: number
  onChangePage(page: number): Promise<void>,
  onChangeLimit(limit: number): Promise<void>,
  isLoading: boolean
}

export function usePagination<TData, TFilters = {}>(requestFn: TPaginationRequestFn<TData, TFilters>, pageLimit?: number, filters?: TFilters | undefined): IPaginationHook<TData> {
  const [state, setState] = useState<IPaginationHookState<TData>>({ isLoading: true, data: [], total: 0, pages: 1, pagination: { page: 1, limit: pageLimit ?? listPageSize } })

  const fetchData = useCallback(async(pagination?: IPaginationParams): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true, pagination: pagination ?? prevState.pagination }))
    const { data, total, pages } = await requestFn(pagination ?? state.pagination, filters)
    setState((prevState) => ({ ...prevState, data, total, pages, isLoading: false }))
  }, [state, requestFn, filters])

  useEffect(() => {
    void fetchData()
  // eslint-disable-next-line
  }, [])

  const changePage = useCallback<(page: number) => Promise<void>>(
    async (page) => {
      await fetchData({
        ...state.pagination,
        page,
      })
    },
    [fetchData, state.pagination]
  )

  const changeLimit = useCallback<(limit: number) => Promise<void>>(
    async (limit) => {
      await fetchData({
        ...state.pagination,
        limit,
      })
    },
    [fetchData, state.pagination]
  )

  const pagination: ITablePagination = {
    total: state.total,
    limit: state.pagination.limit,
    page: state.pagination.page,
    isLoading: state.isLoading,
    onChangePage: changePage,
    onChangeLimit: changeLimit,
  }

  return {
    refresh: fetchData,
    pagination,
    state,
  }
}