import { ReactNode } from 'react';
import { CustomChakraProvider } from './CustomChakraProvider';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  pageProps: AppProps['pageProps'];
  children: ReactNode;
}

export default function Providers({ children, pageProps }: ProvidersProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CustomChakraProvider>{children}</CustomChakraProvider>
    </SessionProvider>
  );
}
