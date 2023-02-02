export interface IGlobalConstants {
  apiLocation: string
  appSlug: string
  corporateSite: string
  publicUrl: string
  authDomain: string
  authClientId: string
}

export const appConfig: IGlobalConstants = {
  apiLocation: process.env.NODE_ENV == 'production' ? window.__RUNTIME_CONFIG__.API_URL : process.env.REACT_APP_API_URL || 'https://api.grubstack.app/v1',
  appSlug: process.env.NODE_ENV == 'production' ? window.__RUNTIME_CONFIG__.APP_SLUG : process.env.APP_SLUG || '',
  corporateSite: process.env.NODE_ENV == 'production' ? window.__RUNTIME_CONFIG__.CORPORATE_URL : process.env.REACT_APP_CORPORATE_URL || 'https://grubstack.app',
  publicUrl: process.env.NODE_ENV == 'production' ? `${window.__RUNTIME_CONFIG__.PUBLIC_URL}/${window.__RUNTIME_CONFIG__.APP_SLUG}` : process.env.PUBLIC_URL || 'http://localhost:3001',
  authDomain: process.env.NODE_ENV == 'production' ?  window.__RUNTIME_CONFIG__.AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN || 'dev-x2xvjtterdxi3zgj.us.auth0.com',
  authClientId: process.env.NODE_ENV == 'production' ?  window.__RUNTIME_CONFIG__.AUTH_CLIENT_ID : process.env.REACT_APP_AUTH_CLIENT_ID || 'fzdrD4DJDsg992k2KCr3rngy9Ph6W5YG',
}