import { AxiosInstance } from 'axios'
import { IResponse } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IReviewService, IReview } from './reviews.types'

export class ReviewService implements IReviewService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getDetails(): Promise<IResponse<IReview>> {
    const resp = await this.httpClient.get<IResponse<IReview>>(`/restaurant/details`)
    return resp.data
  }
}