import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Utils } from 'src/utils';

export function useErrorToast(error: string | string[] | undefined) {
  const toast = useToast();

  useEffect(() => {
    if (!error) return;

    const errors: string[] = Utils.errors.decodeErrors(error);
    errors.forEach((e) => {
      toast({
        title: 'Oops!',
        description: e,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  }, [error, toast]);
}
