export interface Environment {
  appName: string;
  isProduction: boolean;
  apiUrl: string;
  useMockAuth: boolean;
  enableDevTools: boolean;
  defaultPageSize: number;
  debounceTimeMs: number;
  sentryDsn?: string;
  storage: {
    accessTokenKey: string;
    currentUserKey: string;
  };
}
