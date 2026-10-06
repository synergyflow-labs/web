import { TRANSLATION_TOKENS } from './language.config';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface NavItem {
  id: string;
  labelKey: string;
  route: string;
  icon: string;
  roles?: UserRole[];
}

export const DEFAULT_USER_ROUTE: Record<UserRole, string> = {
  [UserRole.Admin]: '/dashboard',
  [UserRole.User]: '/dashboard',
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    labelKey: TRANSLATION_TOKENS.NAV.DASHBOARD,
    route: '/dashboard',
    icon: 'pi pi-chart-line',
  },
  {
    id: 'items',
    labelKey: TRANSLATION_TOKENS.NAV.ITEMS,
    route: '/items',
    icon: 'pi pi-list',
  },
  {
    id: 'settings',
    labelKey: TRANSLATION_TOKENS.NAV.SETTINGS,
    route: '/settings',
    icon: 'pi pi-cog',
  },
];
