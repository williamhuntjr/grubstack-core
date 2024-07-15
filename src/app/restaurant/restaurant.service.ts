import { AxiosInstance } from 'axios'
import { IResponse } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IRestaurantService } from './restaurant.types'
import { IOrderType } from './order-types/order-types.types'

export class RestaurantService implements IRestaurantService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getOrderTypes(): Promise<IResponse<IOrderType[]>> {
    const resp = await this.httpClient.get<IResponse<IOrderType[]>>(`/restaurant/order-types`)
    return resp.data
  }
}
