import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
  theme as _theme,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { fonts } from 'src/theme/fonts';

export function CustomChakraProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}

const config: ThemeConfig & Record<string, unknown> = {
  initialColorMode: 'dark', // strangely, it doesn't work... we use the hook manually to make it dark on load
  useSystemColorMode: false,
  fonts: {
    heading: fonts.primary.style.fontFamily,
    body: fonts.primary.style.fontFamily,
  },
  colors: {
    gray: {
      50: '#ffffff',
      100: '#fafafa',
      200: '#eaeaea',
      300: '#999',
      400: '#888',
      500: '#666',
      600: '#444',
      700: '#333',
      800: '#111',
      900: '#000',
    },
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'outline',
      },
    },
  },
};

const theme = extendTheme(config) as typeof _theme;

export const useTheme = () => theme;
