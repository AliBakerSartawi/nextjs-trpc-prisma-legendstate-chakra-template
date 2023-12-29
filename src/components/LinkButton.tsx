import { Link } from '@chakra-ui/next-js';
import { Button, ButtonProps } from '@chakra-ui/react';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export default function LinkButton(props: LinkButtonProps) {
  return <Button as={Link} {...props} />;
}
