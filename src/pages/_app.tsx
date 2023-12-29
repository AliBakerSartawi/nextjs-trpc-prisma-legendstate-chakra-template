import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from 'src/components/DefaultLayout';
import Providers from 'src/providers';
import { trpcClient } from 'src/client/trpc.client';

// import { DefaultLayout } from '~/components/DefaultLayout';
// import { trpc } from '~/utils/trpc';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <Providers pageProps={pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}) as AppType;

export default trpcClient.withTRPC(App);
