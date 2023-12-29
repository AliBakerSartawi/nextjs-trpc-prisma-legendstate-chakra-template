import { observer } from '@legendapp/state/react';
import { $store } from 'src/store/store';
import { ProductItem__ } from './ProductItem__';

export const Products = observer(() => {
  const products = $store.modifications.products.get();

  return (
    products?.map((product) => (
      <ProductItem__ key={String(product?.id)} product={product} />
    )) ?? null
  );
});
