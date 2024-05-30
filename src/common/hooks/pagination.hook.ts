import { useCallback, useEffect, useState } from 'react'
import { IPaginationData, IPaginationParams } from 'common/types'
import { listPageSize } from 'common/constants'

export interface IPaginationHookState<TData, TFilters> {
  isLoading: boolean
  pagination: IPaginationParams
  data: TData[]
  total: number
  pages: number
  filters?: TFilters
}

export interface IPaginationHook<TData, TFilters> {
  pagination: ITablePagination
  state: IPaginationHookState<TData, TFilters>
  refresh(): Promise<void>
  updateFilters(filters: TFilters): Promise<void>
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

export function usePagination<TData, TFilters = {}>(requestFn: TPaginationRequestFn<TData, TFilters>, pageLimit?: number, filters?: TFilters | undefined): IPaginationHook<TData, TFilters> {
  const [state, setState] = useState<IPaginationHookState<TData, TFilters>>({ isLoading: true, data: [], total: 0, pages: 1, pagination: { page: 1, limit: pageLimit ?? listPageSize}, filters: filters})

  const fetchData = useCallback(async(pagination?: IPaginationParams, newFilters?: TFilters): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true, pagination: pagination ?? prevState.pagination }))
    try {
      const { data, total, pages } = await requestFn(pagination ?? state.pagination, newFilters ? newFilters : state.filters)
      setState((prevState) => ({ ...prevState, data, total, pages, isLoading: false }))
    } catch (e) {
      console.error(e)
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }, [state, requestFn])

  useEffect(() => {
    void fetchData()
  // eslint-disable-next-line
  }, [])

  const updateFilters = useCallback<(newFilters: TFilters) => Promise<void>>(
    async (newFilters) => {
      setState((prevState) => ({ ...prevState, filters: newFilters }))
      await fetchData({
        ...state.pagination,
      }, newFilters)
    },
    [fetchData, state.pagination]
  )

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
    updateFilters
  }
}