import { Environment } from './environment.model';

export const environment: Environment = {
  appName: 'SynergyFlow (Dev)',
  isProduction: false,
  apiUrl: 'http://localhost:8080/api',
  useMockAuth: true,
  enableDevTools: true,
  defaultPageSize: 10,
  debounceTimeMs: 300,
  sentryDsn: '',
  storage: {
    accessTokenKey: 'app_access_token_dev',
    currentUserKey: 'app_current_user_dev',
  },
};
