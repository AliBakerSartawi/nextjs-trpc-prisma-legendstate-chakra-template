import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useErrorToast } from 'src/hooks/useErrorToast';
import { trpcClient } from 'src/client/trpc.client';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <Center flex={1} flexDirection="column" gap={8}>
      <Marquee autoFill>
        <Heading size="2xl" lineHeight="1.2">
          Register&nbsp;
        </Heading>
      </Marquee>
      <RegisterForm />
    </Center>
  );
};

export default RegisterPage;

function RegisterForm() {
  const registerMutation = trpcClient.user.register.useMutation();
  useErrorToast(registerMutation.error?.message);

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isConfirmPasswordInvalid =
    !!confirmPassword && password !== confirmPassword;

  const isSubmittable =
    name && email && password && password === confirmPassword;

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassowrd(e.target.value);
  };
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (!isSubmittable) {
      return;
    }

    try {
      const user = await registerMutation.mutateAsync({
        name,
        email,
        password,
      });
      if (user) void router.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Your name</FormLabel>
        <Input type="text" value={name} onChange={handleNameChange} />
      </FormControl>
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
      <FormControl isRequired isInvalid={isConfirmPasswordInvalid}>
        <FormLabel>Confirm password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {isConfirmPasswordInvalid && (
          <FormErrorMessage>Passwords do not match</FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        mt={2}
        isDisabled={!isSubmittable}
        isLoading={registerMutation.isLoading}
      >
        Register
      </Button>
    </Stack>
  );
}
