import { Stack } from '@chakra-ui/react';
import { ShopName } from './ShopName';
import { ShopSlogan } from './ShopSlogan';
import { ShopDescription } from './ShopDescription';
import { SaveShop } from './SaveShop';
import { Products } from './Products';
import { AddProduct } from './AddProduct';

export function ShopDetails() {
  return (
    <Stack spacing={8} flex={1}>
      <ShopName />
      <ShopSlogan />
      <ShopDescription />
      <Products />
      <Stack spacing={0} pos="sticky" bottom={8}>
        <AddProduct />
        <SaveShop />
      </Stack>
    </Stack>
  );
}
