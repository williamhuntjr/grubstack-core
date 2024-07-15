import { GSMode } from 'common/utils/mode/mode.types'

export const varietyServiceToken = 'VarietyService'
export const varietyRoutePath = '/varieties'
export const varietyBuilderRoutePath = '/variety'

export const defaultVarietyState = {
  isLoading: false,
  data: [],
  mode: GSMode.New,
  total: 0,
  pages: 1,
  page: 1,
}
