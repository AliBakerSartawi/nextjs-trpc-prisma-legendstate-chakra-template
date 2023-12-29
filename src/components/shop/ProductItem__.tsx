import { Stack } from '@chakra-ui/react';
import { $Prop__Product } from 'src/store/store';
import { ProductItem__NameInput } from './ProductItem__NameInput';
import { ProductItem__PriceInput } from './ProductItem__PriceInput';
import { ProductItem__TypeChangeMenu } from './ProductItem__TypeChangeMenu';
import { ProductItem__DescriptionInput } from './ProductItem__DescriptionInput';
import { observer } from '@legendapp/state/react';

export const ProductItem__ = observer(
  ({ product }: { product: $Prop__Product }) => {
    return (
      <Stack>
        <ProductItem__TypeChangeMenu product={product} />
        <ProductItem__NameInput product={product} />
        <ProductItem__PriceInput product={product} />
        <ProductItem__DescriptionInput product={product} />
      </Stack>
    );
  },
);
