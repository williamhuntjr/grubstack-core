export {};

declare global {
  interface Window {
    _env_: {
      API_URL: string;
      NODE_ENV: string;
      APP_SLUG: string;
      CORPORATE_URL: string;
      SITE_URL: string;
      AUTH_DOMAIN: string;
      AUTH_CLIENT_ID: string;
    };
  }
}