import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { LoginSchema } from 'src/schema/auth.schema';
import { NextPageWithLayout } from './_app';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <Center flex={1} flexDirection="column" gap={8}>
      <Marquee autoFill>
        <Heading size="2xl" lineHeight="1.2">
          Login&nbsp;
        </Heading>
      </Marquee>
      <LoginForm />
    </Center>
  );
};

export default RegisterPage;

function LoginForm() {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);

  const isSubmittable = email && password;

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassowrd(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (!isSubmittable) {
      return;
    }

    try {
      setLoading(true);
      const data: LoginSchema = { email, password };
      const res = await signIn('credentials', {
        ...data,
        callbackUrl: '/shop',
      });

      if (res?.error) {
        toast({
          title: 'Oops!',
          description: res.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormControl>
      <Button
        type="submit"
        mt={2}
        isDisabled={!isSubmittable}
        isLoading={loading}
      >
        Login
      </Button>
    </Stack>
  );
}
