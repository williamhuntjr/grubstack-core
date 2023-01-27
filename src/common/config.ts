export interface IGlobalConstants {
  apiLocation: string
  corporateSite: string
  siteUrl: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  corporateSite: process.env.REACT_APP_CORPORATE_URL || 'https://grubstack.app',
  siteUrl: process.env.REACT_APP_SITE_URL || 'https://core.grubstack.app',
}