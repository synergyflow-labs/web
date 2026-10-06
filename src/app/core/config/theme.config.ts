import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppThemePreset = definePreset(Aura, {
  primitive: {
    fontFamily: "'Inter', sans-serif",
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '5px',
      md: '10px',
      lg: '15px',
      xl: '20px',
    },
  },
  semantic: {
    primary: {
      50: 'var(--clr-primary-50)',
      100: 'var(--clr-primary-100)',
      200: 'var(--clr-primary-200)',
      300: 'var(--clr-primary-300)',
      400: 'var(--clr-primary-400)',
      500: 'var(--clr-primary-500)',
      600: 'var(--clr-primary-600)',
      700: 'var(--clr-primary-700)',
      800: 'var(--clr-primary-800)',
      900: 'var(--clr-primary-900)',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
      },
    },
  },
});
