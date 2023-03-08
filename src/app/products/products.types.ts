import { IPaginationParams, IPaginationData } from 'common/types'

export interface IProduct {
  name: string
}

export interface IProductService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IProduct>>
  delete(sid: string): Promise<void>
  create(params: IProduct): Promise<IProduct>
  update(params: IProduct): Promise<IProduct>
}
