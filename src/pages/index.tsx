import { Center, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Marquee from 'react-fast-marquee';
import LinkButton from 'src/components/LinkButton';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  const { status } = useSession();

  return (
    <Center flex={1} flexDirection="column" gap={4}>
      <Marquee autoFill speed={100}>
        <Heading fontSize={['72px', null, '144px']} pointerEvents="none">
          NextJS tRPC Prisma LegendState ChakraUI Template&nbsp;
        </Heading>
      </Marquee>
      {status === 'authenticated' ? (
        <LinkButton href="/shop">Manage your shop</LinkButton>
      ) : (
        <LinkButton href="/register">Get Started</LinkButton>
      )}
    </Center>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
