import { GSMode } from 'common/utils/mode/mode.types'
import { IPaginationParams, IPaginationData, IResponse } from 'common/types'
import { IBuilderItemFormValues } from 'app/builder/builder-tool/item-form/item-form.types'
import { IItem } from '../items/items.types'

export interface IMenu {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  items?: IItem[]
}

export interface IMenuState {
  isLoading: boolean
  data: IMenu[]
  mode: GSMode
  total: number
  pages: number
  page: number
}

export interface IMenuService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IMenu>>
  get(menuId: string): Promise<IResponse<IMenu>>
  create(params: IMenu): Promise<IMenu>
  update(params: IMenu): Promise<IMenu>
  delete(menuId: string): Promise<void>
  getItems(paginationParams: IPaginationParams, menuId: string): Promise<IPaginationData<IItem>>
  addItem(menuId: string, itemId: string): Promise<void>
  deleteItem(menuId: string, itemId: string): Promise<void>
  updateItem(menuId: string, itemId: string, data: IBuilderItemFormValues): Promise<void>
}