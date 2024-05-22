import { AxiosInstance } from 'axios'
import { IResponse } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IMarketingService, IMarketing } from './marketing.types'

export class MarketingService implements IMarketingService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getDetails(): Promise<IResponse<IMarketing>> {
    const resp = await this.httpClient.get<IResponse<IMarketing>>(`/restaurant/details`)
    return resp.data
  }
}