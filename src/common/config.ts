export interface IGlobalConstants {
  apiLocation: string
  corporateSite: string
  siteUrl: string
  authDomain: string
  authClientId: string
  appVersion: string
  appId: number
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.NODE_ENV == 'production' ? window._env_.API_URL : process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  corporateSite: process.env.NODE_ENV == 'production' ? window._env_.CORPORATE_URL : process.env.REACT_APP_CORPORATE_URL || 'https://localhost:3000',
  siteUrl: process.env.NODE_ENV == 'production' ? window._env_.SITE_URL : process.env.SITE_URL || 'http://localhost:3001',
  authDomain: process.env.NODE_ENV == 'production' ?  window._env_.AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN || 'dev-x2xvjtterdxi3zgj.us.auth0.com',
  authClientId: process.env.NODE_ENV == 'production' ?  window._env_.AUTH_CLIENT_ID : process.env.REACT_APP_AUTH_CLIENT_ID || 'fzdrD4DJDsg992k2KCr3rngy9Ph6W5YG',
  appVersion: '0.1.1',
  appId: 2,
}
