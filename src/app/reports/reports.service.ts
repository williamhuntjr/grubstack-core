import { AxiosInstance } from 'axios'
import { IResponse } from 'common/types'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IReportService, IReport } from './reports.types'

export class ReportService implements IReportService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getDetails(): Promise<IResponse<IReport>> {
    const resp = await this.httpClient.get<IResponse<IReport>>(`/restaurant/details`)
    return resp.data
  }
}