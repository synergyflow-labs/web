import { Environment } from './environment.model';

export const environment: Environment = {
  appName: 'SynergyFlow',
  isProduction: true,
  apiUrl: '/api',
  useMockAuth: false,
  enableDevTools: false,
  defaultPageSize: 10,
  debounceTimeMs: 300,
  sentryDsn: '',
  storage: {
    accessTokenKey: 'app_access_token',
    currentUserKey: 'app_current_user',
  },
};
