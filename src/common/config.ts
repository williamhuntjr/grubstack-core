const appVersion = require('../../package.json').version

export interface IGlobalConstants {
  apiLocation: string
  productionApi: string
  productionUrl: string
  tenantId: string
  siteUrl: string
  authDomain: string
  authClientId: string
  appVersion: string
  appId: number
  cdnUrl: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.NODE_ENV == 'production' ? window._env_.API_URL : process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  productionApi: process.env.NODE_ENV == 'production' ? window._env_.PRODUCTION_API : process.env.REACT_APP_PRODUCTION_API || 'https://api.grubstack.app/v1',
  productionUrl: process.env.NODE_ENV == 'production' ? window._env_.PRODUCTION_URL : process.env.REACT_APP_PRODUCTION_URL || 'https://localhost:3000',
  tenantId: process.env.NODE_ENV == 'production' ? window._env_.TENANT_ID : process.env.REACT_APP_TENANT_ID || 'abcdefg',
  siteUrl: process.env.NODE_ENV == 'production' ? window._env_.SITE_URL : process.env.SITE_URL || 'http://localhost:3001',
  authDomain: process.env.NODE_ENV == 'production' ?  window._env_.AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN || 'dev-x2xvjtterdxi3zgj.us.auth0.com',
  authClientId: process.env.NODE_ENV == 'production' ?  window._env_.AUTH_CLIENT_ID : process.env.REACT_APP_AUTH_CLIENT_ID || 'fzdrD4DJDsg992k2KCr3rngy9Ph6W5YG',
  appVersion: appVersion,
  appId: 2,
  cdnUrl: 'https://cdn.grubstack.app'
}
