export interface IGlobalConstants {
  apiLocation: string
  corporateSite: string
  siteUrl: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.NODE_ENV == 'production' ? window._env_.API_URL : process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  corporateSite: process.env.NODE_ENV == 'production' ? window._env_.CORPORATE_URL : process.env.REACT_APP_CORPORATE_URL || 'https://grubstack.app',
  siteUrl: process.env.NODE_ENV == 'production' ? window._env_.SITE_URL : process.env.REACT_APP_SITE_URL || 'http://localhost:3001',
}