import { AxiosInstance } from 'axios'
import { IResponse } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IRestaurantService, IRestaurantDetails } from './restaurant.types'

export class RestaurantService implements IRestaurantService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getDetails(): Promise<IResponse<IRestaurantDetails>> {
    const resp = await this.httpClient.get<IResponse<IRestaurantDetails>>(`/restaurant/details`)
    return resp.data
  }
}