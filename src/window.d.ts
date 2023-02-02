export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_URL: string;
      NODE_ENV: string;
      APP_SLUG: string;
      CORPORATE_URL: string;
      PUBLIC_URL: string;
      AUTH_DOMAIN: string;
      AUTH_CLIENT_ID: string;
    };
  }
}