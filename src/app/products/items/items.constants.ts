import { GSMode } from 'common/utils/mode/mode.types'

export const itemServiceToken = 'ItemService'
export const itemRoutePath = '/items'
export const itemBuilderRoutePath = '/item'

export const defaultItemState = {
  isLoading: false,
  data: [],
  mode: GSMode.New,
  total: 0,
  pages: 1,
  page: 1,
}
