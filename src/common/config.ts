const appVersion = require('../../package.json').version

export interface IGlobalConstants {
  apiLocation: string
  productionApi: string
  productionUrl: string
  tenantId: string
  siteUrl: string
  appVersion: string
  appId: number
  cdnUrl: string
}

export const appConfig: IGlobalConstants = {
  apiLocation:
    process.env.NODE_ENV == 'production' ? window._env_.API_URL : process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  productionApi:
    process.env.NODE_ENV == 'production'
      ? window._env_.PRODUCTION_API
      : process.env.REACT_APP_PRODUCTION_API || 'https://api.grubstack.app/v1',
  productionUrl:
    process.env.NODE_ENV == 'production'
      ? window._env_.PRODUCTION_URL
      : process.env.REACT_APP_PRODUCTION_URL || 'http://local.grubstack.app',
  tenantId: process.env.NODE_ENV == 'production' ? window._env_.TENANT_ID : process.env.REACT_APP_TENANT_ID || 'abcdefg',
  siteUrl: process.env.NODE_ENV == 'production' ? window._env_.SITE_URL : process.env.SITE_URL || 'http://localhost:3001',
  appVersion: appVersion,
  appId: 2,
  cdnUrl: 'https://cdn.grubstack.app',
}
