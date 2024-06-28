export {}

declare global {
  interface Window {
    _env_: {
      API_URL: string
      NODE_ENV: string
      APP_SLUG: string
      PRODUCTION_URL: string
      PRODUCTION_API: string
      TENANT_ID: string
      SITE_URL: string
      AUTH_DOMAIN: string
      AUTH_CLIENT_ID: string
    }
  }
}
