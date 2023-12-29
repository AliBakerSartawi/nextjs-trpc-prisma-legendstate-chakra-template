import { Link } from '@chakra-ui/next-js';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Flex,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { fonts } from 'src/theme/fonts';
import LinkButton from './LinkButton';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    colorMode === 'light' && toggleColorMode();
  }, [colorMode, toggleColorMode]);

  return (
    <>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={fonts.primary.className}>
        <Fade in transition={{ enter: { duration: 0.8, delay: 0.2 } }}>
          <Container
            maxW="4xl"
            minH="100vh"
            display="flex"
            flexDirection="column"
          >
            <Header />
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
              {children}
            </ErrorBoundary>
            <Footer />
          </Container>
        </Fade>
      </main>
    </>
  );
};

function Header() {
  const { status } = useSession();
  const [show, setShow] = useState(false);

  const handleLogOut = () => signOut({ callbackUrl: '/' });

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <Collapse in={show} animateOpacity>
      <Flex gap={4} py={4} mb={8} align="center" justify="space-between">
        <Heading as={Link} href="/" size="md">
          NextJS tRPC Prisma LegendState ChakraUI Template
        </Heading>
        <Flex gap={4}>
          {status === 'authenticated' ? (
            <Button onClick={handleLogOut}>Logout</Button>
          ) : (
            <>
              <LinkButton href="/register">Register</LinkButton>
              <LinkButton href="/login">Log In</LinkButton>
            </>
          )}
        </Flex>
      </Flex>
    </Collapse>
  );
}

function Footer() {
  return <Box mt={8} />;
}

function ErrorBoundaryFallback(_props: FallbackProps) {
  return (
    <Alert
      status="error"
      variant="subtle"
      p={16}
      borderRadius={18}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Oops!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Something went wrong. Please try again later.
      </AlertDescription>
    </Alert>
  );
}
