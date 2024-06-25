import { IResponse, IProperty } from 'common/types'

export interface IRestaurantService {
  getProperty(key: string): Promise<IResponse<IProperty>>
  updateProperty(params: IProperty): Promise<IResponse<IProperty>>
}

export interface IRestaurantDetails {
  
}

export interface IRestaurantContainer {
  label?: string
  route?: string
  routeReload?: boolean
  children?: React.ReactNode
}