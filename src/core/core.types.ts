export interface IHttpErrorResponse {
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface IServerError extends Error {
  message: string
  response: IHttpErrorResponse
  request: XMLHttpRequest
}

export class EmptyResponseError extends Error {}
