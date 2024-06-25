export interface IObjectWithId {
  id: string | number
}

export interface IResponse<TData, TStatus = IResponseStatus> {
  data: TData
  status: TStatus
}

export interface IResponseStatus {
  code: string
  message: string
}

export interface IResponseStatusPagination extends IResponseStatus {
  totalrowcount: number
  totalpages: number
}

export interface IPaginationParams {
  limit: number
  page: number
  id?: string
}

export interface IPaginationResponse<TData> {
  data: TData[] | object
  status: IResponseStatusPagination
}

export interface IPaginationData<TData> {
  data: TData[]
  total: number
  pages: number
}

export interface IJWTToken {
  aud: string[]
  azp: string
  exp: number
  iat: number
  iss: string
  scope: string
  sub: string
}

export interface IVersion {
  id: number
  version: string
}

export interface IProperty {
  key: string
  value: string
}