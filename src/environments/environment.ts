import { Environment } from './environment.model';

export type { Environment } from './environment.model';

export const environment: Environment = {
  appName: 'SynergyFlow',
  isProduction: false,
  apiUrl: 'http://localhost:8080/api',
  useMockAuth: true,
  enableDevTools: true,
  defaultPageSize: 10,
  debounceTimeMs: 300,
  sentryDsn: '',
  storage: {
    accessTokenKey: 'app_access_token',
    currentUserKey: 'app_current_user',
  },
};
