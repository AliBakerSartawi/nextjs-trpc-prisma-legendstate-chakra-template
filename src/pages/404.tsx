import { Center, Text } from '@chakra-ui/react';
import LinkButton from 'src/components/LinkButton';

export default function Custom404() {
  return (
    <Center flex={1} gap={2} flexDirection="column">
      <Text fontSize="6xl">404</Text>
      <LinkButton href="/">{`Let's go home`}</LinkButton>
    </Center>
  );
}
