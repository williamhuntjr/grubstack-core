import { GSMode } from 'common/utils/mode/mode.types'

export const itemServiceToken = 'ItemService'
export const itemRoutePath = '/item'

export const defaultItemState = {
  isLoading: false,
  data: [],
  mode: GSMode.New,
  total: 0,
  pages: 1,
  page: 1,
}
