import { AxiosInstance } from 'axios'
import { IResponse, IProperty } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IRestaurantService } from './restaurant.types'

export class RestaurantService implements IRestaurantService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getProperty(key: string): Promise<IResponse<IProperty>> {
    const resp = await this.httpClient.get<IResponse<IProperty>>(`/restaurant/properties/${key}`)
    return resp.data
  }

  public async updateProperty(params: IProperty): Promise<IResponse<IProperty>> {
    const resp = await this.httpClient.put<IResponse<IProperty>>(`/restaurant/properties`, { params })
    return resp.data
  }
}