import { AxiosInstance } from 'axios'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IResponse, IPaginationParams, IPaginationData, IPaginationResponse } from 'common/types'
import { prepareRequestParams } from 'common/utils/request.utils'
import { IEmployee, IEmployeeService } from './employees.types'

export class EmployeeService implements IEmployeeService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IEmployee>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IEmployee>>('/employees', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async delete(employeeId: number): Promise<void> {
    const params = { employee_id: employeeId }
    await this.httpClient.post<Promise<void>>('/employee/delete', { params })
  }

  public async create(params: IEmployee): Promise<IEmployee> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IEmployee>>('/employee/create', { params })
    return data
  }

  public async update(params: IEmployee): Promise<IEmployee> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IEmployee>>('/employee/update', { params })
    return data
  }
}