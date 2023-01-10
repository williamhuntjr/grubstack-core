export interface IGlobalConstants {
  apiLocation: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
}