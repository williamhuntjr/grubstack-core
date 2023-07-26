import { AxiosInstance } from 'axios'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IEmployeeService } from './employees.types'

export class EmployeeService implements IEmployeeService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(): Promise<void> {
    const { data } = await this.httpClient.get('/media-library')
    return data.data
  }
}